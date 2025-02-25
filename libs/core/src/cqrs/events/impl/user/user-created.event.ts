import { IEvent } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class UserCreatedEvent implements IEvent {
    constructor(public readonly auth: User) {}
}
