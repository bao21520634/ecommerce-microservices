import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateProductCategoryCommand } from '../impl';
import { ProductCategory } from '@ecommerce-microservices/proto-schema';
import { ProductCategoryRepository } from '../../repositories';
import { ProductCategoryCreatedEvent } from '../../events';

@CommandHandler(CreateProductCategoryCommand)
export class CreateProductCategoryHandler
    implements ICommandHandler<CreateProductCategoryCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productCategoryRepo: ProductCategoryRepository,
    ) {}

    async execute(
        command: CreateProductCategoryCommand,
    ): Promise<ProductCategory.ProductCategory> {
        this.logger.log(`execute create product command`);
        try {
            console.log('command............', command.request.data);

            const result = await this.productCategoryRepo.store.create({
                data: command.request.data,
            });

            this.eventBus.publish(new ProductCategoryCreatedEvent(result));

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
