import { Product } from '@ecommerce-microservices/proto-schema';

export class UpdateProductCommand {
    constructor(public readonly request: Product.UpdateProductInput) {}
}
