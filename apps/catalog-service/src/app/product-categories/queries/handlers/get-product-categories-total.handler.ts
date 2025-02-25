import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductCategoryRepository } from '../../repositories';
import { Common } from '@ecommerce-microservices/proto-schema';
import { GetProductCategoriesTotalQuery } from '../impl';

@QueryHandler(GetProductCategoriesTotalQuery)
export class GetProductCategoriesTotalHandler
    implements IQueryHandler<GetProductCategoriesTotalQuery>
{
    constructor(
        private readonly productCategoryRepo: ProductCategoryRepository,
    ) {}

    async execute(data: GetProductCategoriesTotalQuery): Promise<Common.Count> {
        try {
            const prismaQuery = this.productCategoryRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.productCategoryRepo.store.count({
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
