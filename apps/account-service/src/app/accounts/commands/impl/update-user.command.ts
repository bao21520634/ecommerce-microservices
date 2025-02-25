import { ICommand } from '@nestjs/cqrs';
import { User } from '@ecommerce-microservices/proto-schema';

export class UpdateUserCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly data: Partial<User.UpdateRequest>,
    ) {}
}
