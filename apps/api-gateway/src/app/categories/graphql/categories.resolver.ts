import { Resolver, Query, Args, Context, Int } from '@nestjs/graphql';
import {
    GqlContext,
    RESOURCES,
    SCOPES,
    setRpcContext,
} from '@ecommerce-microservices/core';
import { transformFindArgsToGrpcQuery } from '@ecommerce-microservices/common';
import { lastValueFrom } from 'rxjs';
import { Category as CategoryDto } from './entity/categories.entity';
import { FindManyCategoryArgs } from './dtos/find-many-category.args';
import { Public, Resource, Scopes } from 'nest-keycloak-connect';

@Resolver(() => CategoryDto)
@Resource(RESOURCES.CATEGORY)
@Public()
@Scopes(SCOPES.READ)
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

        return result.data as CategoryDto;
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

        return categories.categories as CategoryDto[];
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
