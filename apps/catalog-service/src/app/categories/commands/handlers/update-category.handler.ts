import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCategoryCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { CategoryRepository } from '../../repositories';
import { Category } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { CategoryUpdatedEvent } from '../../events';
import { Prisma } from '@prisma/client';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
    implements ICommandHandler<UpdateCategoryCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly categoryRepo: CategoryRepository,
    ) {}

    async execute(command: UpdateCategoryCommand): Promise<Category.Category> {
        this.logger.log(`execute update category command`);

        try {
            const category = command.request.data;

            const result = await this.categoryRepo.store.update({
                where: {
                    id: command.request.id,
                },
                data: category as Prisma.CategoryUpdateInput,
            });

            await this.eventBus.publish(new CategoryUpdatedEvent(result));

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
