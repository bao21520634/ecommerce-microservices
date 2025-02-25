import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { VerifyEmailCommand } from '../impl/verify-email.command';
import { UserRepository } from '../../repositories/user.repository';
import { Auth } from '@ecommerce-microservices/proto-schema';
import { User as PrismaUser } from '@prisma/client';
import { EmailVerifiedEvent } from '../../events';

/**
 * @class
 * @implements {ICommandHandler<VerifyEmailCommand>}
 */
@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
    logger = new Logger(this.constructor.name);

    /**
     * @constructor
     * @param userRepo {UserRepository}
     * @param eventBus {EventBus}
     */
    constructor(
        private readonly userRepo: UserRepository,
        private readonly eventBus: EventBus,
    ) {}

    /**
     * @param command {VerifyEmailCommand}
     */
    async execute(
        command: VerifyEmailCommand,
    ): Promise<Auth.VerifyAccountResponse> {
        this.logger.log(`Async ${command.constructor.name}...`);
        const { code, email } = command;

        try {
            const user: PrismaUser = await this.userRepo.store.findFirst({
                where: {
                    emails: {
                        some: {
                            address: email,
                            primary: true,
                            verificationCode: code,
                        },
                    },
                },
            });

            if (!user) {
                throw new RpcException('Invalid verification code');
            }

            const updatedUser = await this.userRepo.store.update({
                where: {
                    id: user.id,
                },
                data: {
                    emails: {
                        updateMany: {
                            where: {
                                address: email,
                            },
                            data: {
                                verificationCode: null,
                                verified: true,
                            },
                        },
                    },
                },
            });

            if (updatedUser) {
                this.eventBus.publish(new EmailVerifiedEvent(updatedUser));
                return { success: true };
            }

            return { success: false };
        } catch (error) {
            this.logger.log(error);
            throw new RpcException(error);
        }
    }
}
