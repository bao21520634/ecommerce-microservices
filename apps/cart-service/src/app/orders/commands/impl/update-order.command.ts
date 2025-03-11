import { Order } from '@ecommerce-microservices/proto-schema';

export class UpdateOrderCommand {
    constructor(public readonly request: Order.UpdateOrderInput) {}
}
