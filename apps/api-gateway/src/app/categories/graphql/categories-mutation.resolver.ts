import { Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import {
    GqlContext,
    RESOURCES,
    ROLES,
    SCOPES,
    setRpcContext,
} from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { Category as CategoryDto } from './entity/categories.entity';
import { CreateOneCategoryArgs } from './dtos/create-one-category.args';
import { UpdateOneCategoryArgs } from './dtos/update-one-category.args';
import { Resource, Roles, Scopes } from 'nest-keycloak-connect';

@Resolver(() => CategoryDto)
@Resource(RESOURCES.CATEGORY)
@Roles({ roles: [ROLES.VENDOR] })
export class CategoriesMutationResolver {
    @Mutation(() => CategoryDto, { nullable: true })
    @Scopes(SCOPES.CREATE)
    async createCategory(
        @Context() context: GqlContext,
        @Args() input: CreateOneCategoryArgs,
    ): Promise<CategoryDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.createCategory(
                {
                    data: input.data,
                },
                grpcContext,
            ),
        );

        return result as CategoryDto;
    }

    @Mutation(() => CategoryDto, { nullable: true })
    @Scopes(SCOPES.UPDATE)
    async updateCategory(
        @Context() context: GqlContext,
        @Args() input: UpdateOneCategoryArgs,
    ): Promise<CategoryDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.updateCategory(
                {
                    id: input.id,
                    data: input.data,
                },
                grpcContext,
            ),
        );

        return result as CategoryDto;
    }

    @Mutation(() => CategoryDto, { nullable: true })
    @Scopes(SCOPES.DELETE)
    async deleteCategory(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ) {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.catalog.svc.deleteCategory({ id }, grpcContext),
        );

        return !!result;
    }
}
