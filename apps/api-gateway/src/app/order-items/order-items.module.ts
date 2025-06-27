import { Module } from '@nestjs/common';
import { OrderItemsResolver } from './graphql/order-items.resolver';
import { OrderItemsMutationResolver } from './graphql/order-items-mutation.resolver';
import { CartsRpcClientService } from '@ecommerce-microservices/core';

@Module({
    providers: [
        CartsRpcClientService,
        OrderItemsResolver,
        OrderItemsMutationResolver,
    ],
    exports: [CartsRpcClientService],
    controllers: [],
})
export class OrderItemsModule {}
