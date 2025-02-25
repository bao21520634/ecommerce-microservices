import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import {
    generateHashedPassword,
    validPassword,
} from '@ecommerce-microservices/common';
import { UpdateUserPasswordCommand } from '../impl/update-user-password.command';
import { UserRepository } from '../../repositories/user.repository';
import { Auth } from '@ecommerce-microservices/proto-schema';
import { User as PrismaUser } from '@prisma/client';
import { UserPasswordUpdatedEvent } from '../../events';

/**
 * @implements {ICommandHandler<UpdateUserPasswordCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler
    implements ICommandHandler<UpdateUserPasswordCommand>
{
    logger = new Logger(this.constructor.name);

    /**
     * @constructor
     * @param userRepo
     * @param eventBus
     * @param jwtService
     */
    constructor(
        private readonly userRepo: UserRepository,
        private readonly eventBus: EventBus,
        private readonly jwtService: JwtService,
    ) {}

    async execute(
        command: UpdateUserPasswordCommand,
    ): Promise<Auth.UpdatePasswordResponse> {
        this.logger.log(`Async ${command.constructor.name}...`);
        const { cmd } = command;

        try {
            const condition = {
                id: cmd.userId,
            };

            if (cmd.newPassword !== cmd.confirmPassword) {
                throw new RpcException('Your passwords do not match');
            }

            const user: PrismaUser = await this.userRepo.store.findFirst({
                where: condition,
            });
            if (!user) {
                throw new RpcException(
                    'Your password reset request has failed',
                );
            }

            if (cmd.oldPassword !== 'reset') {
                if (
                    !validPassword(
                        cmd.oldPassword,
                        user.services.password.hashed,
                    )
                ) {
                    throw new RpcException('Your passwords do not match');
                }
            }

            const newUser = await this.userRepo.store.update({
                where: { id: cmd.userId },
                data: {
                    services: {
                        update: {
                            password: {
                                hashed: generateHashedPassword(cmd.newPassword),
                            },
                        },
                    },
                },
            });

            this.eventBus.publish(new UserPasswordUpdatedEvent(newUser));
            return {
                success: true,
            };
        } catch (error) {
            this.logger.log(error);
            throw new RpcException(error);
        }
    }
}
