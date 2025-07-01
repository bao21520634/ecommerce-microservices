import { Module } from '@nestjs/common';
import { SettingsResolver } from './graphql/settings.resolver';
import { SettingsMutationResolver } from './graphql/settings-mutation.resolver';
import { SetupsRpcClientService } from '@ecommerce-microservices/core';

@Module({
    providers: [
        SetupsRpcClientService,
        SettingsResolver,
        SettingsMutationResolver,
    ],
    exports: [SetupsRpcClientService],
    controllers: [],
})
export class SettingsModule {}
