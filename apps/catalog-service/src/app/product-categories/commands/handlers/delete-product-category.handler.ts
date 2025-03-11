import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteProductCategoryCommand } from '../impl';
import { Common } from '@ecommerce-microservices/proto-schema';
import { ProductCategoryRepository } from '../../repositories';
import { ProductCategoryDeletedEvent } from '../../events';

@CommandHandler(DeleteProductCategoryCommand)
export class DeleteProductCategoryHandler
    implements ICommandHandler<DeleteProductCategoryCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productCategoryRepo: ProductCategoryRepository,
    ) {}

    async execute(
        command: DeleteProductCategoryCommand,
    ): Promise<Common.DeleteResponse> {
        this.logger.log(`execute create product command`);
        try {
            console.log('command............', command.request);

            const result = await this.productCategoryRepo.store.delete({
                where: {
                    categoryId_productId: {
                        categoryId: command.request.data.categoryId,
                        productId: command.request.data.productId,
                    },
                },
            });

            await this.eventBus.publish(
                new ProductCategoryDeletedEvent(result),
            );

            return {
                success: true,
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
