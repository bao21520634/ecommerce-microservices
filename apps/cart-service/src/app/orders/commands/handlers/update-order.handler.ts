import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateOrderCommand } from '../impl';
import { Order } from '@ecommerce-microservices/proto-schema';
import { OrderRepository } from '../../repositories';
import { Prisma } from '@prisma/client';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand> {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly orderRepo: OrderRepository,
    ) {}

    async execute(command: UpdateOrderCommand): Promise<Order.Order> {
        this.logger.log(`execute update order command`);
        try {
            console.log('command............', command.request.data);

            const order = command.request.data;

            const result = await this.orderRepo.store.update({
                where: {
                    id: command.request.id,
                },
                data: {
                    ...order,
                    paymentResult: order.paymentResult
                        ? JSON.parse(order.paymentResult)
                        : {},
                } as Prisma.OrderUpdateInput,
            });

            return {
                ...result,
                paymentResult: JSON.stringify(result.paymentResult),
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
