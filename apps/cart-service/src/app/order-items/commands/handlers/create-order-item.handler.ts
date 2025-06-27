import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderItemCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { OrderItemRepository } from '../../repositories';
import { OrderItem } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@CommandHandler(CreateOrderItemCommand)
export class CreateOrderItemHandler
    implements ICommandHandler<CreateOrderItemCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly orderItemRepo: OrderItemRepository,
    ) {}

    async execute(
        command: CreateOrderItemCommand,
    ): Promise<OrderItem.OrderItem> {
        this.logger.log(`execute create orderItem command`);

        try {
            const orderItem = command.request.data;

            const result = await this.orderItemRepo.store.create({
                data: orderItem as Prisma.OrderItemCreateInput,
            });

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
