import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from '@ecommerce-microservices/core';
import { cleanEmptyProperties } from '@ecommerce-microservices/common';
import { UpdateUserCommand } from '../impl';
import { RpcException } from '@nestjs/microservices';
import { User } from '@ecommerce-microservices/proto-schema';
import { UserRepository } from '../../repositories/user.repository';

/**
 * @implements {ICommandHandler<UpdateUserCommand>}
 * @classdesc CQRS command to update user entity
 * @class
 */
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly eventBus: EventBus,
    ) {}

    async execute(command: UpdateUserCommand): Promise<User.UpdateResponse> {
        this.logger.log(`Async ${command.constructor.name}...`);
        const { data, id } = command;

        try {
            const update = cleanEmptyProperties(data);

            const user = await this.userRepository.store.update({
                where: { id: id.toString() },
                data: update,
            });

            this.eventBus.publish(new UserCreatedEvent(user));

            return {
                user: user as unknown as User.User,
            };
        } catch (error) {
            this.logger.log(error);
            throw new RpcException(error);
        }
    }
}
