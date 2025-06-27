import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCategoryCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { CategoryRepository } from '../../repositories';
import { Category } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { CategoryCreatedEvent } from '../../events';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
    implements ICommandHandler<CreateCategoryCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly categoryRepo: CategoryRepository,
    ) {}

    async execute(command: CreateCategoryCommand): Promise<Category.Category> {
        this.logger.log(`execute create category command`);

        try {
            const category = command.request.data;

            const result = await this.categoryRepo.store.create({
                data: {
                    ...category,
                    parentId: category.parentId ?? null,
                } as Prisma.CategoryCreateInput,
            });

            await this.eventBus.publish(new CategoryCreatedEvent(result));

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
