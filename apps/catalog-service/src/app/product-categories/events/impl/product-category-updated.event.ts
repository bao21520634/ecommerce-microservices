import { IEvent } from '@nestjs/cqrs';
import { ProductCategory } from '@prisma/client';

export class ProductCategoryUpdatedEvent implements IEvent {
    constructor(public readonly productCategory: ProductCategory) {}
}
