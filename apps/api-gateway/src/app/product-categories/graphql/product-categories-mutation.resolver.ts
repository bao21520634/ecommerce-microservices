import { Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { ProductCategory as ProductCategoryDto } from './entity/product-categories.entity';
import { CreateOneProductCategoryArgs } from './dtos/create-one-product-category.args';
import { DeleteOneProductCategoryArgs } from './dtos/delete-one-product-category.args';
import { FirebaseAuthGuard } from '@ecommerce-microservices/firebase-auth';
import { UseGuards } from '@nestjs/common';

@Resolver(() => ProductCategoryDto)
@UseGuards(FirebaseAuthGuard)
export class ProductCategoriesMutationResolver {
    @Mutation(() => ProductCategoryDto, { nullable: true })
    async createProductCategory(
        @Context() context: GqlContext,
        @Args() input: CreateOneProductCategoryArgs,
    ): Promise<ProductCategoryDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.createProductCategory(
                {
                    data: input.data,
                },
                grpcContext,
            ),
        );

        return result as ProductCategoryDto;
    }

    @Mutation(() => ProductCategoryDto, { nullable: true })
    async deleteProductCategory(
        @Context() context: GqlContext,
        @Args() input: DeleteOneProductCategoryArgs,
    ) {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.deleteProductCategory(
                {
                    data: input.data,
                },
                grpcContext,
            ),
        );

        return !!result;
    }
}
