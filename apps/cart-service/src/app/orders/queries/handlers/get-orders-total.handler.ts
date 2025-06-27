import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OrderRepository } from '../../repositories';
import { Common } from '@ecommerce-microservices/proto-schema';
import { GetOrdersTotalQuery } from '../impl';

@QueryHandler(GetOrdersTotalQuery)
export class GetOrdersTotalHandler
    implements IQueryHandler<GetOrdersTotalQuery>
{
    constructor(private readonly orderRepo: OrderRepository) {}

    async execute(data: GetOrdersTotalQuery): Promise<Common.Count> {
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
