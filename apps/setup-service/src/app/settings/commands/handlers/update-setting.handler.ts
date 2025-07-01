import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSettingCommand } from '../impl';
import { Logger } from '@nestjs/common';
import { SettingRepository } from '../../repositories';
import { Setting } from '@ecommerce-microservices/proto-schema';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@CommandHandler(UpdateSettingCommand)
export class UpdateSettingHandler
    implements ICommandHandler<UpdateSettingCommand>
{
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly eventBus: EventBus,
        private readonly settingRepo: SettingRepository,
    ) {}

    async execute(command: UpdateSettingCommand): Promise<Setting.Setting> {
        this.logger.log(`execute update setting command`);

        try {
            const setting = command.request.data;

            const result = await this.settingRepo.store.update({
                where: {
                    id: command.request.id,
                },
                data: setting as Prisma.SettingUpdateInput,
            });

            return result;
        } catch (error) {
            this.logger.error(error);
            throw new RpcException(error);
        }
    }
}
