import { Resolver, Query, Args, Context, Int } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import {
    mapEnum,
    transformFindArgsToGrpcQuery,
} from '@ecommerce-microservices/common';
import { CategoryStatus as PrismaCategoryStatus } from '@prisma/client';
import { Category as PbCategory } from '@ecommerce-microservices/proto-schema';
import { lastValueFrom } from 'rxjs';
import { Category as CategoryDto } from './entity/categories.entity';
import { FindManyCategoryArgs } from './dtos/find-many-category.args';

@Resolver(() => CategoryDto)
export class CategoriesResolver {
    @Query(() => CategoryDto, { nullable: true })
    async category(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ): Promise<CategoryDto> {
        const grpcContext = setRpcContext(context);
        const result = await lastValueFrom(
            context.rpc.catalog.svc.category(
                {
                    id,
                },
                grpcContext,
            ),
        );

        return {
            ...result.data,
            status: mapEnum(
                PrismaCategoryStatus,
                PbCategory.CategoryStatus,
                result.data.status,
            ),
        } as CategoryDto;
    }

    @Query(() => [CategoryDto])
    async categories(
        @Context() context: GqlContext,
        @Args() args: FindManyCategoryArgs,
    ): Promise<CategoryDto[]> {
        const grpcContext = setRpcContext(context);

        const categories = await lastValueFrom(
            context.rpc.catalog.svc.categories(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return (categories.categories.map((category) => ({
            ...category,
            status: mapEnum(
                PrismaCategoryStatus,
                PbCategory.CategoryStatus,
                category.status,
            ),
        })) ?? []) as CategoryDto[];
    }

    @Query(() => Int)
    async categoriesTotal(
        @Context() context: GqlContext,
        @Args() args: FindManyCategoryArgs,
    ): Promise<number> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.categoriesTotal(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return result.totalCount ?? 0;
    }
}
