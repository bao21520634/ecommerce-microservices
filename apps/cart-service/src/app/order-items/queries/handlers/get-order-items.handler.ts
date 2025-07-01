import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OrderItemRepository } from '../../repositories';
import { OrderItem } from '@ecommerce-microservices/proto-schema';
import { GetOrderItemsQuery } from '../impl';

@QueryHandler(GetOrderItemsQuery)
export class GetOrderItemsHandler implements IQueryHandler<GetOrderItemsQuery> {
    constructor(private readonly orderItemRepo: OrderItemRepository) {}

    async execute(data: GetOrderItemsQuery): Promise<OrderItem.OrderItems> {
        try {
            const prismaQuery = this.orderItemRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.orderItemRepo.store.findMany({
                where: prismaQuery.where,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                orderBy: prismaQuery.orderBy,
            });

            return {
                orderItems: result,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
