import { AccountsRpcClientService } from '@ecommerce-microservices/core';
import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { buildContext } from 'graphql-passport';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    constructor(private readonly account: AccountsRpcClientService) {}

    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
        const schemaPath = join(
            process.cwd(),
            'apps/api-gateway/src/schema.gql',
        );

        console.log('Schema file path:', schemaPath);

        return {
            autoSchemaFile: schemaPath,
            sortSchema: true,
            debug: true,
            introspection: true,
            context: ({ req, res, payload, connection }) => {
                const bc = buildContext({ req, res });

                return {
                    payload,
                    connection,
                    ...bc,
                    req: {
                        ...req,
                        ...bc.req,
                    },
                    rpc: {
                        account: this.account,
                    },
                };
            },
            fieldResolverEnhancers: ['guards', 'interceptors'],
        };
    }
}
