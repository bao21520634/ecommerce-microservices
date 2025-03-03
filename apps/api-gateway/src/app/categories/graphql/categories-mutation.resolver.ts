import { Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { mapEnum } from '@ecommerce-microservices/common';
import { CategoryStatus as PrismaCategoryStatus } from '@prisma/client';
import { Category as PbCategory } from '@ecommerce-microservices/proto-schema';
import { lastValueFrom } from 'rxjs';
import { Category as CategoryDto } from './entity/categories.entity';
import { CreateOneCategoryArgs } from './dtos/create-one-category.args';
import { UpdateOneCategoryArgs } from './dtos/update-one-category.args';

@Resolver(() => CategoryDto)
export class CategoriesMutationResolver {
    @Mutation(() => CategoryDto, { nullable: true })
    async createCategory(
        @Context() context: GqlContext,
        @Args() input: CreateOneCategoryArgs,
    ): Promise<CategoryDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.createCategory(
                {
                    data: {
                        ...input.data,
                        status: mapEnum(
                            PbCategory.CategoryStatus,
                            PrismaCategoryStatus,
                            input.data.status,
                        ),
                    },
                },
                grpcContext,
            ),
        );

        return {
            ...result,
            status: mapEnum(
                PrismaCategoryStatus,
                PbCategory.CategoryStatus,
                result.status,
            ),
        } as CategoryDto;
    }

    @Mutation(() => CategoryDto, { nullable: true })
    async updateCategory(
        @Context() context: GqlContext,
        @Args() input: UpdateOneCategoryArgs,
    ): Promise<CategoryDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.updateCategory(
                {
                    id: input.id,
                    data: {
                        ...input.data,
                        status: mapEnum(
                            PbCategory.CategoryStatus,
                            PrismaCategoryStatus,
                            input.data.status,
                        ),
                    },
                },
                grpcContext,
            ),
        );

        return {
            ...result,
            status: mapEnum(
                PrismaCategoryStatus,
                PbCategory.CategoryStatus,
                result.status,
            ),
        } as CategoryDto;
    }

    @Mutation(() => CategoryDto, { nullable: true })
    async deleteCategory(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ): Promise<CategoryDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.deleteCategory({ id }, grpcContext),
        );

        return {
            ...result,
            status: mapEnum(
                PrismaCategoryStatus,
                PbCategory.CategoryStatus,
                result.status,
            ),
        } as CategoryDto;
    }
}
