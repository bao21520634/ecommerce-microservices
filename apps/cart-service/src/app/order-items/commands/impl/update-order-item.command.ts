import { OrderItem } from '@ecommerce-microservices/proto-schema';

export class UpdateOrderItemCommand {
    constructor(public readonly request: OrderItem.UpdateOrderItemInput) {}
}
