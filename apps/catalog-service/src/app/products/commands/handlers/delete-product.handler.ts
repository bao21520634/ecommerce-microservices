import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteProductCommand } from '../impl';
import { Common } from '@ecommerce-microservices/proto-schema';
import { ProductRepository } from '../../repositories';
import { ProductDeletedEvent } from '../../events';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
    implements ICommandHandler<DeleteProductCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly productRepo: ProductRepository,
    ) {}

    async execute(
        command: DeleteProductCommand,
    ): Promise<Common.DeleteResponse> {
        this.logger.log(`execute delete product command`);
        try {
            const result = await this.productRepo.store.delete({
                where: {
                    id: command.request.id,
                },
            });

            await this.eventBus.publish(new ProductDeletedEvent(result));

            return {
                success: true,
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
