import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DeleteOrderCommand } from '../impl';
import { Common } from '@ecommerce-microservices/proto-schema';
import { OrderRepository } from '../../repositories';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderHandler implements ICommandHandler<DeleteOrderCommand> {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly orderRepo: OrderRepository,
    ) {}

    async execute(command: DeleteOrderCommand): Promise<Common.DeleteResponse> {
        this.logger.log(`execute delete order command`);
        try {
            await this.orderRepo.store.delete({
                where: {
                    id: command.request.id,
                },
            });

            return {
                success: true,
            };
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
