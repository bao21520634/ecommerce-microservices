import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { CategoryRepository } from '../../repositories';
import { Common } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
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

    async execute(
        command: DeleteCategoryCommand,
    ): Promise<Common.DeleteResponse> {
        this.logger.log(`execute delete category command`);

        try {
            const result = await this.categoryRepo.store.delete({
                where: {
                    id: command.request.id,
                },
            });

            await this.eventBus.publish(new CategoryDeletedEvent(result));

            return {
                success: true,
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
