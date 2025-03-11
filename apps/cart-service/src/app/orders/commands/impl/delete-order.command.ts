import { Common } from '@ecommerce-microservices/proto-schema';

export class DeleteOrderCommand {
    constructor(public readonly request: Common.Id) {}
}
