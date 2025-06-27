import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
    CatalogsRpcClientService,
    SearchsRpcClientService,
    CoreModule,
    ServiceRegistryModule,
    CartsRpcClientService,
    SetupsRpcClientService,
    KeycloakConfigService,
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
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrdersResolver } from './orders/graphql/orders.resolver';
import { OrdersMutationResolver } from './orders/graphql/orders-mutation.resolver';
import { OrderItemsResolver } from './order-items/graphql/order-items.resolver';
import { OrderItemsMutationResolver } from './order-items/graphql/order-items-mutation.resolver';
import { SettingsModule } from './settings/settings.module';
import { SettingsResolver } from './settings/graphql/settings.resolver';
import { SettingsMutationResolver } from './settings/graphql/settings-mutation.resolver';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TimestampInterceptor } from '@ecommerce-microservices/common';
import {
    AuthGuard,
    KeycloakConnectModule,
    ResourceGuard,
    RoleGuard,
} from 'nest-keycloak-connect';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        CoreModule,
        ServiceRegistryModule,
        KeycloakConnectModule.registerAsync({
            imports: [ConfigModule],
            useClass: KeycloakConfigService,
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GqlConfigService,
            imports: [
                CategoriesModule,
                ProductsModule,
                ProductCategoriesModule,
                OrdersModule,
                OrderItemsModule,
                SettingsModule,
                SearchsModule,
            ],
            inject: [
                CatalogsRpcClientService,
                CartsRpcClientService,
                SetupsRpcClientService,
                SearchsRpcClientService,
            ],
        }),
        CategoriesModule,
        ProductsModule,
        ProductCategoriesModule,
        OrdersModule,
        OrderItemsModule,
        SettingsModule,
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
        OrdersResolver,
        OrdersMutationResolver,
        OrderItemsResolver,
        OrderItemsMutationResolver,
        SettingsResolver,
        SettingsMutationResolver,
        SearchsResolver,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimestampInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
