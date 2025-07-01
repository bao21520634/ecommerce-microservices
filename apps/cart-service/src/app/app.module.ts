import { CoreModule } from '@ecommerce-microservices/core';
import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
    imports: [CoreModule, OrdersModule, OrderItemsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
