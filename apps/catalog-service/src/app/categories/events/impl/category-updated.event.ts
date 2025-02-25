import { IEvent } from '@nestjs/cqrs';
import { Category } from '@prisma/client';

export class CategoryUpdatedEvent implements IEvent {
    constructor(public readonly category: Category) {}
}
