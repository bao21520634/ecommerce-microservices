import { ProductCategory } from '@ecommerce-microservices/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class GetProductCategoriesQuery implements IQuery {
    constructor(
        public readonly query?: ProductCategory.ProductCategoryFilterInput,
    ) {}
}
