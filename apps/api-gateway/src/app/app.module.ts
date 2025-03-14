import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
    CatalogsRpcClientService,
    SearchsRpcClientService,
    CoreModule,
    RoleModule,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { GqlConfigService } from '../gql-config.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { ProductsResolver } from './products/graphql/products.resolver';
import { ProductsMutationResolver } from './products/graphql/products-mutation.resolver';
import { ProductCategoriesResolver } from './product-categories/graphql/product-categories.resolver';
import { ProductCategoriesMutationResolver } from './product-categories/graphql/product-categories-mutation.resolver';
import { CategoriesResolver } from './categories/graphql/categories.resolver';
import { CategoriesMutationResolver } from './categories/graphql/categories-mutation.resolver';
import { SearchsModule } from './searchs/searchs.module';
import { SearchsResolver } from './searchs/graphql/searchs.resolver';

@Module({
    imports: [
        CoreModule,
        RoleModule,
        ServiceRegistryModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GqlConfigService,
            imports: [
                CategoriesModule,
                ProductsModule,
                ProductCategoriesModule,
                SearchsModule,
            ],
            inject: [CatalogsRpcClientService, SearchsRpcClientService],
        }),
        CategoriesModule,
        ProductsModule,
        ProductCategoriesModule,
        SearchsModule,
    ],
    controllers: [],
    providers: [
        ProductsResolver,
        ProductsMutationResolver,
        ProductCategoriesResolver,
        ProductCategoriesMutationResolver,
        CategoriesResolver,
        CategoriesMutationResolver,
        SearchsResolver,
    ],
})
export class AppModule {}
