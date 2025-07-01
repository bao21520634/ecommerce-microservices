import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OrderItemRepository } from '../../repositories';
import { GetOrderItemQuery } from '../impl';
import { OrderItem } from '@ecommerce-microservices/proto-schema';

@QueryHandler(GetOrderItemQuery)
export class GetOrderItemHandler implements IQueryHandler<GetOrderItemQuery> {
    constructor(private readonly orderItemRepo: OrderItemRepository) {}

    async execute(
        query: GetOrderItemQuery,
    ): Promise<OrderItem.NullableOrderItem> {
        try {
            const result = await this.orderItemRepo.store.findFirst({
                where: {
                    id: query.id,
                },
            });

            return {
                data: result,
                null: result ? 0 : undefined,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
