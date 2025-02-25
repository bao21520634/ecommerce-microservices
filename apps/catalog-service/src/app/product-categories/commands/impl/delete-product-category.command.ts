import { Common } from '@ecommerce-microservices/proto-schema';

export class DeleteProductCategoryCommand {
    constructor(public readonly request: Common.Id) {}
}
