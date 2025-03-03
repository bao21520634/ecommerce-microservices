import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Product as PbProduct } from '@ecommerce-microservices/proto-schema';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { mapEnum } from '@ecommerce-microservices/common';
import {
    ProductStatus as PrismaProductStatus,
    ProductType as PrismaProductType,
} from '@prisma/client';
import { lastValueFrom } from 'rxjs';
import { Product as ProductDto } from './entity/products.entity';
import { CreateOneProductArgs } from './dtos/create-one-product.args';
import { UpdateOneProductArgs } from './dtos/update-one-product.args';

@Resolver(() => ProductDto)
export class ProductsMutationResolver {
    @Mutation(() => ProductDto, { nullable: true })
    async createProduct(
        @Context() context: GqlContext,
        @Args() input: CreateOneProductArgs,
    ): Promise<ProductDto> {
        console.log('CreateProduct Input:', JSON.stringify(input, null, 2));
        const grpcContext = setRpcContext(context);
        console.log('gRPC Metadata:', grpcContext);

        const data = input.data;

        console.log('payload data:', data);

        try {
            const result = await lastValueFrom(
                context.rpc.catalog.svc.createProduct(
                    {
                        data: {
                            ...data,
                            status: mapEnum(
                                PbProduct.ProductStatus,
                                PrismaProductStatus,
                                data.status,
                            ),
                            productType: mapEnum(
                                PbProduct.ProductType,
                                PrismaProductType,
                                data.productType,
                            ),
                            attributes: JSON.stringify(data.attributes),
                            variantAttributes: JSON.stringify(
                                data.variantAttributes,
                            ),
                        },
                    },
                    grpcContext,
                ),
            );

            console.log('gRPC Response:', JSON.stringify(result, null, 2));

            return {
                ...result,
                status: mapEnum(
                    PrismaProductStatus,
                    PbProduct.ProductStatus,
                    result.status,
                ),
                productType: mapEnum(
                    PrismaProductType,
                    PbProduct.ProductType,
                    result.productType,
                ),
                attributes: result.attributes,
                variantAttributes: result.variantAttributes,
            } as ProductDto;
        } catch (error) {
            console.error('gRPC call error:', error);
            throw error;
        }
    }

    @Mutation(() => ProductDto, { nullable: true })
    async updateProduct(
        @Context() context: GqlContext,
        @Args() input: UpdateOneProductArgs,
    ): Promise<ProductDto> {
        const grpcContext = setRpcContext(context);

        const { id, data } = input;

        const updateData = {
            ...data,
            status: mapEnum(
                PbProduct.ProductStatus,
                PrismaProductStatus,
                data.status,
            ),
            productType: mapEnum(
                PbProduct.ProductType,
                PrismaProductType,
                data.productType,
            ),
            attributes: data.attributes
                ? JSON.stringify(data.attributes)
                : undefined,
            variantAttributes: data.variantAttributes
                ? JSON.stringify(data.variantAttributes.set)
                : undefined,
        };

        const result = await lastValueFrom(
            context.rpc.catalog.svc.updateProduct(
                {
                    id: id,
                    data: updateData,
                },
                grpcContext,
            ),
        );

        return {
            ...result,
            status: mapEnum(
                PrismaProductStatus,
                PbProduct.ProductStatus,
                result.status,
            ),
            productType: mapEnum(
                PrismaProductType,
                PbProduct.ProductType,
                result.productType,
            ),
            attributes: result.attributes,
            variantAttributes: result.variantAttributes,
        } as ProductDto;
    }

    @Mutation(() => ProductDto, { nullable: true })
    async deleteProduct(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ): Promise<ProductDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.deleteProduct({ id }, grpcContext),
        );

        return {
            ...result,
            status: mapEnum(
                PrismaProductStatus,
                PbProduct.ProductStatus,
                result.status,
            ),
            productType: mapEnum(
                PrismaProductType,
                PbProduct.ProductType,
                result.productType,
            ),
            attributes: result.attributes,
            variantAttributes: result.variantAttributes,
        } as ProductDto;
    }
}
