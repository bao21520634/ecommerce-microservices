import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { CategoryRepository } from '../../repositories';
import { Category } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { CategoryStatus as PrismaCategoryStatus } from '@prisma/client';
import { mapEnum } from '@ecommerce-microservices/common';
import { CategoryDeletedEvent } from '../../events';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
    implements ICommandHandler<DeleteCategoryCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly categoryRepo: CategoryRepository,
    ) {}

    async execute(command: DeleteCategoryCommand): Promise<Category.Category> {
        this.logger.log(`execute delete category command`);

        try {
            const result = await this.categoryRepo.store.delete({
                where: {
                    id: command.request.id,
                },
            });

            this.eventBus.publish(new CategoryDeletedEvent(result));

            return {
                ...result,
                status: mapEnum(
                    Category.CategoryStatus,
                    PrismaCategoryStatus,
                    result.status,
                ),
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
