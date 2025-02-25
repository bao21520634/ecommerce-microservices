import { AccountsRpcClientService } from '@ecommerce-microservices/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AccountResolver } from './account.resolver';
import { AccountsMutationResolver } from './account-mutation.resolver';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
    imports: [
        PassportModule.register({
            session: true,
        }),
    ],
    providers: [
        AccountsRpcClientService,
        AccountResolver,
        AccountsMutationResolver,
        AccountService,
        LocalStrategy,
        GoogleStrategy,
    ],
    exports: [AccountsRpcClientService],
    controllers: [AccountController],
})
export class AccountModule {}
