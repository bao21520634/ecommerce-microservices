import { Auth } from '@ecommerce-microservices/proto-schema';
import { ICommand } from '@nestjs/cqrs';

export class ForgotPasswordCommand implements ICommand {
    constructor(public readonly cmd: Partial<Auth.ForgotPasswordRequest>) {}
}
