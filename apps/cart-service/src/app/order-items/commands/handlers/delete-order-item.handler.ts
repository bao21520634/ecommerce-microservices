import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteOrderItemCommand } from '../impl';
import { Common } from '@ecommerce-microservices/proto-schema';
import { OrderItemRepository } from '../../repositories';

@CommandHandler(DeleteOrderItemCommand)
export class DeleteOrderItemHandler
    implements ICommandHandler<DeleteOrderItemCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly orderItemRepo: OrderItemRepository,
    ) {}

    async execute(
        command: DeleteOrderItemCommand,
    ): Promise<Common.DeleteResponse> {
        this.logger.log(`execute delete orderItem command`);
        try {
            await this.orderItemRepo.store.delete({
                where: {
                    id: command.request.id,
                },
            });

            return {
                success: true,
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
