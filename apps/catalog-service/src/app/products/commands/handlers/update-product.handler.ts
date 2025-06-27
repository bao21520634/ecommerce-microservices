import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateProductCommand } from '../impl';
import { Product } from '@ecommerce-microservices/proto-schema';
import { ProductRepository } from '../../repositories';
import { ProductUpdatedEvent } from '../../events';
import { Prisma } from '@prisma/client';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
    implements ICommandHandler<UpdateProductCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productRepo: ProductRepository,
    ) {}

    async execute(command: UpdateProductCommand): Promise<Product.Product> {
        this.logger.log(`execute update product command`);
        try {
            console.log('command............', command.request.data);

            const product = command.request.data;

            const result = await this.productRepo.store.update({
                where: {
                    id: command.request.id,
                },
                data: {
                    ...product,
                    attributes: product.attributes || {},
                    variantAttributes: product.variantAttributes || {},
                } as Prisma.ProductUpdateInput,
            });

            await this.eventBus.publish(new ProductUpdatedEvent(result));

            return {
                ...result,
                attributes: JSON.stringify(result.attributes),
                variantAttributes: JSON.stringify(result.variantAttributes),
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
