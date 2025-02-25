import { IEvent } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class UserDeletedEvent implements IEvent {
    constructor(public readonly user: User) {}
}
