import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { OrderRepository } from '../../repositories';
import { Order } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly orderRepo: OrderRepository,
    ) {}

    async execute(command: CreateOrderCommand): Promise<Order.Order> {
        this.logger.log(`execute create order command`);

        try {
            const order = command.request.data;

            const result = await this.orderRepo.store.create({
                data: {
                    ...order,
                    paymentResult: order.paymentResult
                        ? JSON.parse(order.paymentResult)
                        : {},
                } as Prisma.OrderCreateInput,
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
