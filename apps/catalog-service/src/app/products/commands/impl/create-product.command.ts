import { Product } from '@ecommerce-microservices/proto-schema';

export class CreateProductCommand {
    constructor(public readonly request: Product.CreateProductInput) {}
}
