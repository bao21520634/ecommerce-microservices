import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateOrderItemCommand } from '../impl';
import { OrderItem } from '@ecommerce-microservices/proto-schema';
import { OrderItemRepository } from '../../repositories';
import { Prisma } from '@prisma/client';

@CommandHandler(UpdateOrderItemCommand)
export class UpdateOrderItemHandler
    implements ICommandHandler<UpdateOrderItemCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly orderItemRepo: OrderItemRepository,
    ) {}

    async execute(
        command: UpdateOrderItemCommand,
    ): Promise<OrderItem.OrderItem> {
        this.logger.log(`execute update orderItem command`);
        try {
            console.log('command............', command.request.data);

            const orderItem = command.request.data;

            const result = await this.orderItemRepo.store.update({
                where: {
                    id: command.request.id,
                },
                data: orderItem as Prisma.OrderItemUpdateInput,
            });

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
