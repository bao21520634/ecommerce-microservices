import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateProductCommand } from '../impl';
import { Product } from '@ecommerce-microservices/proto-schema';
import { ProductRepository } from '../../repositories';
import { ProductCreatedEvent } from '../../events';
import {
    ProductType as PrismaProductType,
    ProductStatus as PrismaProductStatus,
} from '@prisma/client';
import { mapEnum } from '@ecommerce-microservices/common';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
    implements ICommandHandler<CreateProductCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productRepo: ProductRepository,
    ) {}

    async execute(command: CreateProductCommand): Promise<Product.Product> {
        this.logger.log(`execute create product command`);
        try {
            console.log('command............', command.request.data);

            const product = command.request.data;

            const result = await this.productRepo.store.create({
                data: {
                    ...product,
                    productType: mapEnum(
                        PrismaProductType,
                        Product.ProductType,
                        product.productType,
                    ),
                    status: mapEnum(
                        PrismaProductStatus,
                        Product.ProductStatus,
                        product.status,
                    ),
                },
            });

            this.eventBus.publish(new ProductCreatedEvent(result));

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
