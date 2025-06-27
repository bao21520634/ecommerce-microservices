import {
    SetupService,
    Setting,
    Common,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { GetSettingQuery } from './queries';
import { UpdateSettingCommand } from './commands';

@Controller('settings')
export class SettingsController implements SetupService.SetupServiceController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(SetupService.SETUP_SERVICE_NAME, 'setting')
    async setting(request: Common.Id, ctx: any): Promise<Setting.Setting> {
        try {
            return this.queryBus.execute(new GetSettingQuery());
        } catch (e) {
            console.log('e controller...........', e);
            throw new RpcException(e);
        }
    }

    @GrpcMethod(SetupService.SETUP_SERVICE_NAME, 'updateSetting')
    async updateSetting(
        request: Setting.UpdateSettingInput,
        ctx: any,
    ): Promise<Setting.Setting> {
        try {
            return await this.commandBus.execute(
                new UpdateSettingCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
