import { Order } from '@ecommerce-microservices/proto-schema';

export class CreateOrderCommand {
    constructor(public readonly request: Order.CreateOrderInput) {}
}
