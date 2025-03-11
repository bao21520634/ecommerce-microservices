import { Module } from '@nestjs/common';
import { SearchsRpcClientService } from '@ecommerce-microservices/core';
import { SearchsResolver } from './graphql/searchs.resolver';

@Module({
    providers: [SearchsRpcClientService, SearchsResolver],
    exports: [SearchsRpcClientService],
    controllers: [],
})
export class SearchsModule {}
