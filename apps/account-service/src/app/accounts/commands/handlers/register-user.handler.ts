import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserCommand } from '../impl/register.user.command';
import { UserRepository } from '../../repositories/user.repository';
import { Auth, User } from '@ecommerce-microservices/proto-schema';
import { generateVerificationCode } from '@ecommerce-microservices/common';
import { UserRegisteredEvent } from '../../events';
import { UserRoles, User as PrismaUser, Prisma } from '@prisma/client';

const authNameMap = {
    [Auth.LoginServiceTypes.Google]: 'google',
};

/**
 * @implements {ICommandHandler<RegisterUserCommand>}
 * @classdesc CQRS command to register new user
 * @class
 */
@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
    implements ICommandHandler<RegisterUserCommand>
{
    logger = new Logger(this.constructor.name);

    /**
     * @constructor
     * @param userRepo
     * @param eventBus
     * @param jwtService
     * @param roleClient
     * @param billingClient
     */
    constructor(
        private readonly userRepo: UserRepository,
        private readonly eventBus: EventBus,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * @description This method is called by the CQRS module
     * @param command
     * @return {CreateResponse} This response contains registration token
     */
    async execute(command: RegisterUserCommand): Promise<User.CreateResponse> {
        this.logger.log(`Async ${command.constructor.name}...`);
        const { cmd } = command;

        try {
            /** Check if user exist with email */
            const userExist = !!(await this.userRepo.store.findFirst({
                where: {
                    emails: {
                        some: { address: cmd.email },
                    },
                },
            }));

            if (userExist) {
                throw new RpcException(
                    'Email is not available, please try another email',
                );
            }

            let activationLink: string = null;
            let user: Prisma.UserCreateInput;

            /** Here we handle social signup */

            console.log('Register User Handler', cmd);

            if (cmd.service !== Auth.LoginServiceTypes.Password) {
                const authName = authNameMap[cmd.service];

                if (!authName) {
                    throw new RpcException('Invalid registration type');
                }

                /** Initialize the user entity with required props */
                user = {
                    primaryEmail: cmd.email,
                    fullName: cmd.fullName,
                    username: cmd.username,
                    role: UserRoles.USER,
                    emails: {
                        create: {
                            address: cmd.email,
                            primary: true,
                            verified: true,
                            verificationCode: null,
                        },
                    },
                    services: {
                        [authName]: {
                            email: cmd.email,
                            accessToken: cmd.tokens.accessToken,
                            userId: cmd.tokens.userId,
                        },
                    },
                };
            } else {
                /** Standard password registration */
                /** Generate verification pin code for our user */
                const verificationCode = generateVerificationCode(6, {
                    type: 'string',
                });

                /** Initialize the user entity with required props */
                user = {
                    primaryEmail: cmd.email,
                    fullName: cmd.fullName,
                    username: cmd.username,
                    role: UserRoles.USER,
                    emails: {
                        create: {
                            address: cmd.email,
                            primary: true,
                            verified: false,
                            verificationCode: verificationCode.toString(),
                        },
                    },
                    services: {
                        password: {
                            hashed: cmd.password,
                        },
                    },
                };

                /** Encode user email and send it back as response to user.
                 *  This token expires after 1h
                 */
                const payload = { email: cmd.email, verificationCode };
                const jwtCode = this.jwtService.sign(payload, {
                    expiresIn: '1h',
                });
                activationLink = `${jwtCode}`;
            }

            /** Persist initialized user entity to store */
            const newUser: PrismaUser & {
                activationLink?: string;
                service?: 'social' | 'local';
            } = await this.userRepo.store.create({
                data: user as Prisma.UserCreateInput,
                include: {
                    emails: true,
                },
            });

            /** Attach the activation link for the event. This is important for the
             * notification service to properly send activation e-mail.
             */
            newUser.activationLink = activationLink;
            newUser.service = activationLink ? 'local' : 'social';

            /** Publish user created event */
            this.eventBus.publish(new UserRegisteredEvent(newUser));

            return { activationLink };
        } catch (error) {
            this.logger.log(error);
            throw new RpcException(error);
        }
    }
}
