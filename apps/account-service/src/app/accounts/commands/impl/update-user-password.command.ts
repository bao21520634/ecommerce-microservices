import { Auth } from '@ecommerce-microservices/proto-schema';
import { ICommand } from '@nestjs/cqrs';

export class UpdateUserPasswordCommand implements ICommand {
    constructor(public readonly cmd: Partial<Auth.UpdatePasswordRequest>) {}
}
