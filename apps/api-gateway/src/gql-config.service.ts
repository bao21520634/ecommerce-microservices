import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import {
    CartsRpcClientService,
    CatalogsRpcClientService,
    GqlContext,
    SearchsRpcClientService,
    SetupsRpcClientService,
} from '@ecommerce-microservices/core';
import { ApolloDriver } from '@nestjs/apollo';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    constructor(
        private readonly catalog: CatalogsRpcClientService,
        private readonly cart: CartsRpcClientService,
        private readonly setup: SetupsRpcClientService,
        private readonly search: SearchsRpcClientService,
    ) {}

    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        const schemaPath = join(
            process.cwd(),
            'apps/api-gateway/src/schema.gql',
        );

        console.log('Schema file path:', schemaPath);

        return {
            driver: ApolloDriver,
            autoSchemaFile: schemaPath,
            sortSchema: true,
            debug: true,
            introspection: true,
            path: '/graphql',
            context: async ({
                req,
                res,
                payload,
                connection,
            }): Promise<GqlContext> => {
                return {
                    payload,
                    connection,
                    req,
                    rpc: {
                        catalog: this.catalog,
                        cart: this.cart,
                        setup: this.setup,
                        search: this.search,
                    },
                };
            },
        };
    }
}
