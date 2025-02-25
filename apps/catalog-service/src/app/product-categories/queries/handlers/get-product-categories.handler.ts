import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductCategoryRepository } from '../../repositories';
import { ProductCategory } from '@ecommerce-microservices/proto-schema';
import { GetProductCategoriesQuery } from '../impl';

@QueryHandler(GetProductCategoriesQuery)
export class GetProductCategoriesHandler
    implements IQueryHandler<GetProductCategoriesQuery>
{
    constructor(
        private readonly productCategoryRepo: ProductCategoryRepository,
    ) {}

    async execute(
        data: GetProductCategoriesQuery,
    ): Promise<ProductCategory.ProductCategories> {
        try {
            const prismaQuery = this.productCategoryRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.productCategoryRepo.store.findMany({
                where: prismaQuery.where,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                orderBy: prismaQuery.orderBy,
            });

            return {
                productCategories: result,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
