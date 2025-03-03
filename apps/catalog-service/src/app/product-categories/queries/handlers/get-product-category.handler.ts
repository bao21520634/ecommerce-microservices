import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductCategoryRepository } from '../../repositories';
import { GetProductCategoryQuery } from '../impl';
import { ProductCategory } from '@ecommerce-microservices/proto-schema';

@QueryHandler(GetProductCategoryQuery)
export class GetProductCategoryHandler
    implements IQueryHandler<GetProductCategoryQuery>
{
    constructor(private readonly productRepo: ProductCategoryRepository) {}

    async execute(
        data: GetProductCategoryQuery,
    ): Promise<ProductCategory.NullableProductCategory> {
        try {
            const result = await this.productRepo.store.findFirst({
                where: {
                    productId: data.query.productId,
                    categoryId: data.query.categoryId,
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
