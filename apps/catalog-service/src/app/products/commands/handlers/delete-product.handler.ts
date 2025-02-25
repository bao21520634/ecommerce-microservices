import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteProductCommand } from '../impl';
import { Product } from '@ecommerce-microservices/proto-schema';
import { ProductRepository } from '../../repositories';
import { ProductDeletedEvent } from '../../events';
import {
    ProductType as PrismaProductType,
    ProductStatus as PrismaProductStatus,
} from '@prisma/client';
import { mapEnum } from '@ecommerce-microservices/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
    implements ICommandHandler<DeleteProductCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productRepo: ProductRepository,
    ) {}

    async execute(command: DeleteProductCommand): Promise<Product.Product> {
        this.logger.log(`execute delete product command`);
        try {
            const result = await this.productRepo.store.delete({
                where: {
                    id: command.request.id,
                },
            });

            this.eventBus.publish(new ProductDeletedEvent(result));

            return {
                ...result,
                productType: mapEnum(
                    Product.ProductType,
                    PrismaProductType,
                    result.productType,
                ),
                status: mapEnum(
                    Product.ProductStatus,
                    PrismaProductStatus,
                    result.status,
                ),
                attributes: JSON.stringify(result.attributes),
                variantAttributes: JSON.stringify(result.variantAttributes),
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
