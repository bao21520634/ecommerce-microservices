import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductRepository } from '../../repositories';
import { Common } from '@ecommerce-microservices/proto-schema';
import { GetProductsTotalQuery } from '../impl';

@QueryHandler(GetProductsTotalQuery)
export class GetProductsTotalHandler
    implements IQueryHandler<GetProductsTotalQuery>
{
    constructor(private readonly productRepo: ProductRepository) {}

    async execute(data: GetProductsTotalQuery): Promise<Common.Count> {
        try {
            const prismaQuery = this.productRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.productRepo.store.count({
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
