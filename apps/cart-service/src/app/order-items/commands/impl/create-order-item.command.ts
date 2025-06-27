import { OrderItem } from '@ecommerce-microservices/proto-schema';

export class CreateOrderItemCommand {
    constructor(public readonly request: OrderItem.CreateOrderItemInput) {}
}
