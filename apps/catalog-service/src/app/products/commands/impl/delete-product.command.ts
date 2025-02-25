import { Common } from '@ecommerce-microservices/proto-schema';

export class DeleteProductCommand {
    constructor(public readonly request: Common.Id) {}
}
