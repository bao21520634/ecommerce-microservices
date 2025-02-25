import { ProductCategory } from '@ecommerce-microservices/proto-schema';

export class UpdateProductCategoryCommand {
    constructor(
        public readonly request: ProductCategory.UpdateProductCategoryInput,
    ) {}
}
