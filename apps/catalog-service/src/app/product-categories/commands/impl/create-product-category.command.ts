import { ProductCategory } from '@ecommerce-microservices/proto-schema';

export class CreateProductCategoryCommand {
    constructor(
        public readonly request: ProductCategory.CreateProductCategoryInput,
    ) {}
}
