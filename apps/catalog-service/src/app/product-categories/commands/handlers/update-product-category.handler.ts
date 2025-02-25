import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateProductCategoryCommand } from '../impl';
import { ProductCategory } from '@ecommerce-microservices/proto-schema';
import { ProductCategoryRepository } from '../../repositories';
import { ProductCategoryUpdatedEvent } from '../../events';

@CommandHandler(UpdateProductCategoryCommand)
export class UpdateProductCategoryHandler
    implements ICommandHandler<UpdateProductCategoryCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productCategoryRepo: ProductCategoryRepository,
    ) {}

    async execute(
        command: UpdateProductCategoryCommand,
    ): Promise<ProductCategory.ProductCategory> {
        this.logger.log(`execute create product command`);
        try {
            console.log('command............', command.request.data);

            const result = await this.productCategoryRepo.store.update({
                where: {
                    id: command.request.id,
                },
                data: command.request.data,
            });

            this.eventBus.publish(new ProductCategoryUpdatedEvent(result));

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
