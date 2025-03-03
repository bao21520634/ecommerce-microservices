import { Resolver, Query, Args, Context, Int } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { transformFindArgsToGrpcQuery } from '@ecommerce-microservices/common';
import { lastValueFrom } from 'rxjs';
import { ProductCategory as ProductCategoryDto } from './entity/product-categories.entity';
import { FindManyProductCategoryArgs } from './dtos/find-many-product-category.args';

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
        @Args() args: FindManyProductCategoryArgs,
    ): Promise<ProductCategoryDto[]> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.productCategories(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return result.productCategories;
    }

    @Query(() => Int)
    async productCategoriesTotal(
        @Context() context: GqlContext,
        @Args() args: FindManyProductCategoryArgs,
    ): Promise<number> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.productCategoriesTotal(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return result.totalCount ?? 0;
    }
}
