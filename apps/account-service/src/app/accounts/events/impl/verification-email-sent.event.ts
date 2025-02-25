import { IEvent } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class VerificationEmailSentEvent implements IEvent {
    constructor(public readonly user: User & { activationLink?: string }) {}
}
