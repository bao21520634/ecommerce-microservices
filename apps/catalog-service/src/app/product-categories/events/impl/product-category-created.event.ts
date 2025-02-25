import { IEvent } from '@nestjs/cqrs';
import { ProductCategory } from '@prisma/client';

export class ProductCategoryCreatedEvent implements IEvent {
    constructor(public readonly productCategory: ProductCategory) {}
}
