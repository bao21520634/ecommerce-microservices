import { IEvent } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class UserRegisteredEvent implements IEvent {
    constructor(
        public readonly user: User & {
            activationLink?: string;
            service?: 'social' | 'local';
        },
    ) {}
}
