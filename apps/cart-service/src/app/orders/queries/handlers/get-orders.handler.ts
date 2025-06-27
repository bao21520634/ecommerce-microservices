import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OrderRepository } from '../../repositories';
import { Order } from '@ecommerce-microservices/proto-schema';
import { GetOrdersQuery } from '../impl';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
    constructor(private readonly orderRepo: OrderRepository) {}

    async execute(data: GetOrdersQuery): Promise<Order.Orders> {
        try {
            const prismaQuery = this.orderRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.orderRepo.store.findMany({
                where: prismaQuery.where,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                orderBy: prismaQuery.orderBy,
            });

            return {
                orders: result.map((order) => ({
                    ...order,
                    paymentResult: JSON.stringify(order.paymentResult),
                })),
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
