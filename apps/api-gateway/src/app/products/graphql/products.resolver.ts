import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { Product as ProductDto } from './entity/products.entity';
import {
    GqlContext,
    RESOURCES,
    SCOPES,
    setRpcContext,
} from '@ecommerce-microservices/core';
import { transformFindArgsToGrpcQuery } from '@ecommerce-microservices/common';
import { lastValueFrom } from 'rxjs';
import { FindManyProductArgs } from './dtos/find-many-product.args';
import { Public, Resource, Scopes } from 'nest-keycloak-connect';

@Resolver(() => ProductDto)
@Resource(RESOURCES.PRODUCT)
@Public()
@Scopes(SCOPES.READ)
export class ProductsResolver {
    @Query(() => ProductDto, { nullable: true })
    async product(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ): Promise<ProductDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.product(
                {
                    id,
                },
                grpcContext,
            ),
        );

        return result.data as ProductDto;
    }

    @Query(() => [ProductDto])
    async products(
        @Context() context: GqlContext,
        @Args() args: FindManyProductArgs,
    ): Promise<ProductDto[]> {
        const grpcContext = setRpcContext(context);

        const products = await lastValueFrom(
            context.rpc.catalog.svc.products(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return products.products as ProductDto[];
    }

    @Query(() => Int)
    async productsTotal(
        @Context() context: GqlContext,
        @Args() args: FindManyProductArgs,
    ): Promise<number> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.productsTotal(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return result.totalCount ?? 0;
    }
}
