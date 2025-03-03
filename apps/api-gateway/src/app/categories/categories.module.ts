import { Module } from '@nestjs/common';
import { CategoriesResolver } from './graphql/categories.resolver';
import { CategoriesMutationResolver } from './graphql/categories-mutation.resolver';
import { CatalogsRpcClientService } from '@ecommerce-microservices/core';

@Module({
    providers: [
        CatalogsRpcClientService,
        CategoriesResolver,
        CategoriesMutationResolver,
    ],
    exports: [CatalogsRpcClientService],
    controllers: [],
})
export class CategoriesModule {}
