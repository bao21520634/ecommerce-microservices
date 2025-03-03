import { ProductCategory } from '@ecommerce-microservices/proto-schema';

export class DeleteProductCategoryCommand {
    constructor(
        public readonly request: ProductCategory.DeleteProductCategoryInput,
    ) {}
}
