import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Auth } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { cleanEmptyProperties } from '@ecommerce-microservices/common';
import { ForgotPasswordCommand } from '../impl/forgot-password.command';
import { UserRepository } from '../../repositories/user.repository';
import { ForgotPasswordSentEvent } from '../../events';

/**
 * @implements {ICommandHandler<ForgotPasswordCommand>}
 * @classdesc CQRS command to request password change
 * @class
 */
@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
    implements ICommandHandler<ForgotPasswordCommand>
{
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        private readonly userRepo: UserRepository,
        private readonly eventBus: EventBus,
        private readonly jwtService: JwtService,
    ) {}

    async execute(
        command: ForgotPasswordCommand,
    ): Promise<Auth.ForgotPasswordResponse> {
        this.logger.log(`Executing ${command.constructor.name}...`);
        const { cmd } = command;

        try {
            // Find user by email
            const user = await this.userRepo.store.findFirst({
                where: {
                    emails: {
                        some: { address: cmd.email },
                    },
                },
            });

            if (!user) {
                throw new RpcException('Email not found');
            }

            // Generate JWT for password reset
            const payload = { id: user.id };
            const jwtCode = this.jwtService.sign(payload, { expiresIn: '1h' });

            // Update reset password link
            const update = cleanEmptyProperties({ resetPasswordLink: jwtCode });
            await this.userRepo.store.update({
                where: { id: user.id },
                data: update,
            });

            this.eventBus.publish(
                new ForgotPasswordSentEvent({
                    ...user,
                    resetPasswordLink: jwtCode,
                }),
            );

            return { success: true };
        } catch (error) {
            this.logger.error(
                `Error in ${command.constructor.name}: ${error.message}`,
            );
            throw new RpcException(error);
        }
    }
}
