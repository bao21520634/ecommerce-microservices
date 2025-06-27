import { CoreModule } from '@ecommerce-microservices/core';
import { Module } from '@nestjs/common';
import { SettingsModule } from './settings/settings.module';

@Module({
    imports: [CoreModule, SettingsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
