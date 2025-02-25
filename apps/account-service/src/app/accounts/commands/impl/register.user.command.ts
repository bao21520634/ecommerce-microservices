import { User } from '@ecommerce-microservices/proto-schema';
import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
    constructor(public readonly cmd: User.CreateRequest) {}
}
