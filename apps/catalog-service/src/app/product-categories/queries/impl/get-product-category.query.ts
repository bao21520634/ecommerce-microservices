import { ProductCategory } from '@ecommerce-microservices/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class GetProductCategoryQuery implements IQuery {
    constructor(public readonly query: ProductCategory.ProductCategoryInput) {}
}
