import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { Product as ProductDto } from './entity/products.entity';
import { Product as PbProduct } from '@ecommerce-microservices/proto-schema';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import {
    mapEnum,
    transformFindArgsToGrpcQuery,
} from '@ecommerce-microservices/common';
import {
    ProductStatus as PrismaProductStatus,
    ProductType as PrismaProductType,
} from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import { FindManyProductArgs } from './dtos/find-many-product.args';

@Resolver(() => ProductDto)
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

        return {
            ...result.data,
            status: mapEnum(
                PrismaProductStatus,
                PbProduct.ProductStatus,
                result.data.status,
            ),
            productType: mapEnum(
                PrismaProductType,
                PbProduct.ProductType,
                result.data.productType,
            ),
        } as ProductDto;
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

        return (products.products.map((product) => ({
            ...product,
            status: mapEnum(
                PrismaProductStatus,
                PbProduct.ProductStatus,
                product.status,
            ),
            productType: mapEnum(
                PrismaProductType,
                PbProduct.ProductType,
                product.productType,
            ),
        })) ?? []) as ProductDto[];
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
