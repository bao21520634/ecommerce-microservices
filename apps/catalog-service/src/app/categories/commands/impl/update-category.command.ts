import { Category } from '@ecommerce-microservices/proto-schema';

export class UpdateCategoryCommand {
    constructor(public readonly request: Category.UpdateCategoryInput) {}
}
