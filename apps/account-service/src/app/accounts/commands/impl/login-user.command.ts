import { ICommand } from '@nestjs/cqrs';
import { Auth } from '@ecommerce-microservices/proto-schema';

export class LoginUserCommand implements ICommand {
    constructor(public readonly cmd: Auth.LoginRequest) {}
}
