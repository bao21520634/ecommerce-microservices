import { Category } from '@ecommerce-microservices/proto-schema';

export class CreateCategoryCommand {
    constructor(public readonly request: Category.CreateCategoryInput) {}
}
