import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ResendVerificationEmailCommand } from '../impl/resend-verification-email.command';
import { UserRepository } from '../../repositories/user.repository';
import { Auth } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { VerificationEmailSentEvent } from '../../events';
import { generateVerificationCode } from '@ecommerce-microservices/common';
import { Prisma, User as PrismaUser } from '@prisma/client';

/**
 * @implements {ICommandHandler<ResendVerificationCodeResponse>}
 * @classdesc CQRS command to resend verification email
 * @class
 */
@CommandHandler(ResendVerificationEmailCommand)
export class ResendVerificationEmailHandler
    implements ICommandHandler<ResendVerificationEmailCommand>
{
    logger = new Logger(this.constructor.name);
    constructor(
        private readonly userRepo: UserRepository,
        private readonly eventBus: EventBus,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * @description This method is called by the CQRS module
     * @param command
     * @return {ResendVerificationCodeResponse}
     */
    async execute(
        command: ResendVerificationEmailCommand,
    ): Promise<Auth.ResendVerificationCodeResponse> {
        this.logger.log(`Async ${command.constructor.name}...`);
        const { email } = command;

        try {
            const user = await this.userRepo.store.findFirst({
                where: {
                    emails: {
                        some: {
                            address: email,
                            primary: true,
                        },
                    },
                },
                include: {
                    emails: true,
                    address: true,
                },
            });

            if (!user) {
                throw new RpcException('No user with email address found');
            }

            // Check if user is verified.
            const userEmail = user.emails.reduce(
                (previousValue) =>
                    previousValue.primary === true && previousValue,
            );
            if (userEmail.verified) {
                throw new RpcException('Email already verified');
            }

            /** Generate verification pin code for our user. */
            const verificationCode = generateVerificationCode(6, {
                type: 'string',
            });

            /** Update the user replacing old pin code with the new pin code. */
            const updatedUser: PrismaUser & {
                activationLink?: string;
            } = await this.userRepo.store.update({
                where: {
                    emails: {
                        some: {
                            address: email,
                        },
                    },
                } as Prisma.UserWhereUniqueInput,
                data: {
                    emails: {
                        update: {
                            where: { address: email },
                            data: {
                                verificationCode: verificationCode.toString(),
                            },
                        },
                    },
                },
            });

            /** Encode user email and send it back as response to user.
             *  This token expires after 1h.
             */
            const payload = { email, verificationCode };
            const jwtCode = this.jwtService.sign(payload, { expiresIn: '1h' });
            const activationLink = `${jwtCode}`;

            /** Publish user created event if user was updated */
            if (updatedUser) {
                /** Attach the activation link for the event. This is important for the
                 * notification service to properly send activation emails.
                 */
                updatedUser.activationLink = activationLink;

                this.eventBus.publish(
                    new VerificationEmailSentEvent(updatedUser),
                );

                /** Returns request successful completion status */
                return { success: true };
            }

            /** Returns request successful completion status */
            return { success: false };
        } catch (error) {
            this.logger.log(error);
            throw new RpcException(error);
        }
    }
}
