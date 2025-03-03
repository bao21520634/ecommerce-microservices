import { Module } from '@nestjs/common';
import { ProductCategoriesResolver } from './graphql/product-categories.resolver';
import { ProductCategoriesMutationResolver } from './graphql/product-categories-mutation.resolver';
import { CatalogsRpcClientService } from '@ecommerce-microservices/core';

@Module({
    providers: [
        CatalogsRpcClientService,
        ProductCategoriesResolver,
        ProductCategoriesMutationResolver,
    ],
    exports: [CatalogsRpcClientService],
    controllers: [],
})
export class ProductCategoriesModule {}
