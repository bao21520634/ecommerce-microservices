import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OrderRepository } from '../../repositories';
import { GetOrderQuery } from '../impl';
import { Order } from '@ecommerce-microservices/proto-schema';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
    constructor(private readonly orderRepo: OrderRepository) {}

    async execute(query: GetOrderQuery): Promise<Order.NullableOrder> {
        try {
            const result = await this.orderRepo.store.findFirst({
                where: {
                    id: query.id,
                },
            });

            return {
                data: result
                    ? {
                          ...result,
                          paymentResult: JSON.stringify(result.paymentResult),
                      }
                    : undefined,
                null: result ? 0 : undefined,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
