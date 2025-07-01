import { Common } from '@ecommerce-microservices/proto-schema';

export class DeleteOrderItemCommand {
    constructor(public readonly request: Common.Id) {}
}
