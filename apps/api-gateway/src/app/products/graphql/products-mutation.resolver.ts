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
import { UseGuards } from '@nestjs/common';
import {
    FirebaseAuthGuard,
    PermissionGuard,
    RequirePermission,
    RoleGuard,
    Roles,
} from '@ecommerce-microservices/firebase-auth';

@Resolver(() => ProductDto)
export class ProductsMutationResolver {
    @Mutation(() => ProductDto, { nullable: true })
    @UseGuards(FirebaseAuthGuard, PermissionGuard)
    @RequirePermission('product', 'create')
    async createProduct(
        @Context() context: GqlContext,
        @Args() input: CreateOneProductArgs,
    ): Promise<ProductDto> {
        const grpcContext = setRpcContext(context);

        const data = input.data;

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
    @UseGuards(FirebaseAuthGuard, PermissionGuard)
    @RequirePermission('product', 'update')
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
    @UseGuards(FirebaseAuthGuard, RoleGuard)
    @Roles('admin')
    async deleteProduct(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ) {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.deleteProduct({ id }, grpcContext),
        );

        return !!result;
    }
}
