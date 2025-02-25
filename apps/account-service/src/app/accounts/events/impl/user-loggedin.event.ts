import { IEvent } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class UserLoggedInEvent implements IEvent {
    constructor(public readonly user: User) {}
}
