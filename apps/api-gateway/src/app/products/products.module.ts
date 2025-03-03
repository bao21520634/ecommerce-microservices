import { Module } from '@nestjs/common';
import { ProductsResolver } from './graphql/products.resolver';
import { ProductsMutationResolver } from './graphql/products-mutation.resolver';
import { CatalogsRpcClientService } from '@ecommerce-microservices/core';

@Module({
    providers: [
        CatalogsRpcClientService,
        ProductsResolver,
        ProductsMutationResolver,
    ],
    exports: [CatalogsRpcClientService],
    controllers: [],
})
export class ProductsModule {}
