import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@ecommerce-microservices/core';
import { AccountModule } from './accounts/account.module';

@Module({
    imports: [CoreModule, AccountModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
