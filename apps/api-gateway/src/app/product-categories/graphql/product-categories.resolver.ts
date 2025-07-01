import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { ProductCategory as ProductCategoryDto } from './entity/product-categories.entity';
import { ProductCategoryWhereInput } from './dtos/product-category-where.input';

@Resolver(() => ProductCategoryDto)
export class ProductCategoriesResolver {
    @Query(() => ProductCategoryDto, { nullable: true })
    async productCategory(
        @Context() context: GqlContext,
        @Args('productId') productId: string,
        @Args('categoryId') categoryId: string,
    ): Promise<ProductCategoryDto> {
        const grpcContext = setRpcContext(context);
        const result = await lastValueFrom(
            context.rpc.catalog.svc.productCategory(
                {
                    productId: productId,
                    categoryId: categoryId,
                },
                grpcContext,
            ),
        );

        return result.data;
    }

    @Query(() => [ProductCategoryDto])
    async productCategories(
        @Context() context: GqlContext,
        @Args('args') args: ProductCategoryWhereInput,
    ): Promise<ProductCategoryDto[]> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.productCategories(
                {
                    categoryIds: args.categoryIds ?? [],
                    productIds: args.productIds ?? [],
                },
                grpcContext,
            ),
        );

        return result.productCategories;
    }
}
