import { Module } from '@nestjs/common';
import { OrdersResolver } from './graphql/orders.resolver';
import { OrdersMutationResolver } from './graphql/orders-mutation.resolver';
import { CartsRpcClientService } from '@ecommerce-microservices/core';

@Module({
    providers: [CartsRpcClientService, OrdersResolver, OrdersMutationResolver],
    exports: [CartsRpcClientService],
    controllers: [],
})
export class OrdersModule {}
