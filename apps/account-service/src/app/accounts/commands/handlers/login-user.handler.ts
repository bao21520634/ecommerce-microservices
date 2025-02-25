import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { LoginUserCommand } from '../impl';
import { UserRepository } from '../../repositories/user.repository';
import { Auth, User } from '@ecommerce-microservices/proto-schema';
import { Prisma, UserRoles as PrismaUserRoles } from '@prisma/client';
import { mapEnum, validPassword } from '@ecommerce-microservices/common';
import { UserLoggedInEvent } from '../../events';

/**
 * @implements {ICommandHandler<LoginUserCommand>}
 * @classdesc CQRS command to login user
 * @class
 */
@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    logger = new Logger(this.constructor.name);

    /**
     * @constructor
     * @param userRepo
     * @param eventBus
     */
    constructor(
        private readonly userRepo: UserRepository,
        private readonly eventBus: EventBus,
    ) {}

    async execute(command: LoginUserCommand): Promise<Auth.LoginResponse> {
        this.logger.log(`Async ${command.constructor.name}...`);
        const { cmd } = command;

        this.logger.log(cmd);
        try {
            const condition = getLoginQuery(cmd);

            const user = await this.userRepo.store.findFirst({
                where: condition,
                include: { emails: true, address: true },
            });

            if (!user) {
                throw new RpcException('Your login credentials is incorrect');
            }

            if (cmd.service === Auth.LoginServiceTypes.Password) {
                if (
                    !validPassword(
                        cmd.params.password,
                        user.services.password.hashed,
                    )
                ) {
                    throw new RpcException(
                        'Your login credentials is incorrect',
                    );
                }

                // Check if user is verified
                const userEmail = user.emails.reduce(
                    (previousValue) =>
                        previousValue.primary === true && previousValue,
                );
                if (!userEmail.verified) {
                    throw new RpcException('Please verify your email address');
                }
            }

            this.eventBus.publish(new UserLoggedInEvent(user));

            return {
                user: {
                    ...user,
                    role: mapEnum(User.UserRoles, PrismaUserRoles, user.role),
                },
                session: undefined,
            };
        } catch (error) {
            this.logger.log(error);
            throw new RpcException(error.message);
        }
    }
}

function getLoginQuery(cmd: Auth.LoginRequest): Prisma.UserWhereInput {
    const baseCondition: Prisma.UserWhereInput = {
        emails: {
            some: { address: cmd.params.email, primary: true },
        },
    };

    if (cmd.service === Auth.LoginServiceTypes.Password) {
        return baseCondition;
    }

    if (cmd.service === Auth.LoginServiceTypes.Google) {
        return {
            ...baseCondition,
            services: {
                google: {
                    userId: cmd.params.userId,
                    email: cmd.params.email,
                },
            },
        };
    }

    return baseCondition;
}
