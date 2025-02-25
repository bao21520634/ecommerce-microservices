import { IEvent } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class ForgotPasswordSentEvent implements IEvent {
    constructor(public readonly user: User & { resetPasswordLink?: string }) {}
}
