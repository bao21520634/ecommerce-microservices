import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OrderItemRepository } from '../../repositories';
import { Common } from '@ecommerce-microservices/proto-schema';
import { GetOrderItemsTotalQuery } from '../impl';

@QueryHandler(GetOrderItemsTotalQuery)
export class GetOrderItemsTotalHandler
    implements IQueryHandler<GetOrderItemsTotalQuery>
{
    constructor(private readonly orderRepo: OrderItemRepository) {}

    async execute(data: GetOrderItemsTotalQuery): Promise<Common.Count> {
        try {
            const prismaQuery = this.orderRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.orderRepo.store.count({
                where: prismaQuery.where,
            });

            return {
                totalCount: result,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
