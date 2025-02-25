import { IEvent } from '@nestjs/cqrs';
import { Category } from '@prisma/client';

export class CategoryDeletedEvent implements IEvent {
    constructor(public readonly category: Category) {}
}
