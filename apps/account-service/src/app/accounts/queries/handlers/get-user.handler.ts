import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repositories/user.repository';
import { GetUserQuery } from '../impl';
import { User } from '@prisma/client';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    logger = new Logger(this.constructor.name);
    constructor(private readonly userRepository: UserRepository) {}

    async execute(query: GetUserQuery): Promise<User> {
        this.logger.log(query);
        const { where } = query;

        if (!where) {
            throw Error('Missing get inputs');
        }

        return await this.userRepository.store.findFirst({
            where: { ...where },
        });
    }
}
