import { IEvent } from '@nestjs/cqrs';
import { Category } from '@prisma/client';

export class CategoryCreatedEvent implements IEvent {
    constructor(public readonly category: Category) {}
}
