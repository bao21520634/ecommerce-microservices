import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
    AccountsRpcClientService,
    CoreModule,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { GqlConfigService } from '../gql-config.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AccountModule } from './accounts/account.module';
import { AccountResolver } from './accounts/account.resolver';
import { AccountsMutationResolver } from './accounts/account-mutation.resolver';

@Module({
    imports: [
        CoreModule,
        ServiceRegistryModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GqlConfigService,
            imports: [AccountModule],
            inject: [AccountsRpcClientService],
        }),
        AccountModule,
    ],
    controllers: [],
    providers: [AccountResolver, AccountsMutationResolver],
})
export class AppModule {}
