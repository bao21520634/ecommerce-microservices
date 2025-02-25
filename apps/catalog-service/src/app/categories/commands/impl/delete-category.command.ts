import { Common } from '@ecommerce-microservices/proto-schema';

export class DeleteCategoryCommand {
    constructor(public readonly request: Common.Id) {}
}
