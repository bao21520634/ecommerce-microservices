import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import {
    GqlContext,
    RESOURCES,
    ROLES,
    SCOPES,
    setRpcContext,
} from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { Product as ProductDto } from './entity/products.entity';
import { CreateOneProductArgs } from './dtos/create-one-product.args';
import { UpdateOneProductArgs } from './dtos/update-one-product.args';
import { Resource, Scopes, Roles } from 'nest-keycloak-connect';

@Resolver(() => ProductDto)
@Resource(RESOURCES.PRODUCT)
@Roles({ roles: [ROLES.VENDOR, ROLES.ADMIN] })
export class ProductsMutationResolver {
    @Mutation(() => ProductDto, { nullable: true })
    @Scopes(SCOPES.CREATE)
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
                            attributes: JSON.stringify(data.attributes),
                            variantAttributes: JSON.stringify(
                                data.variantAttributes,
                            ),
                        },
                    },
                    grpcContext,
                ),
            );

            return result as ProductDto;
        } catch (error) {
            console.error('gRPC call error:', error);
            throw error;
        }
    }

    @Mutation(() => ProductDto, { nullable: true })
    @Scopes(SCOPES.UPDATE)
    async updateProduct(
        @Context() context: GqlContext,
        @Args() input: UpdateOneProductArgs,
    ): Promise<ProductDto> {
        const grpcContext = setRpcContext(context);

        const { id, data } = input;

        const updateData = {
            ...data,
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

        return result as ProductDto;
    }

    @Mutation(() => ProductDto, { nullable: true })
    @Scopes(SCOPES.DELETE)
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
