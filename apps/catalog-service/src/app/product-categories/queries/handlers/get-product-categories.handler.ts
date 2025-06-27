import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductCategoryRepository } from '../../repositories';
import { ProductCategory } from '@ecommerce-microservices/proto-schema';
import { GetProductCategoriesQuery } from '../impl';
import { Prisma } from '@prisma/client';

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
            const whereCondition: Prisma.ProductCategoryWhereInput = {};

            if (data.query.productIds?.length) {
                whereCondition.productId = { in: data.query.productIds };
            }
            if (data.query.categoryIds?.length) {
                whereCondition.categoryId = { in: data.query.categoryIds };
            }

            const result = await this.productCategoryRepo.store.findMany({
                where: whereCondition,
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
