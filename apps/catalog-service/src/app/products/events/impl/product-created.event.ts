import { IEvent } from '@nestjs/cqrs';
import { Product } from '@prisma/client';

export class ProductCreatedEvent implements IEvent {
    constructor(public readonly product: Product) {}
}
