import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import {
    CatalogsRpcClientService,
    GqlContext,
    SearchsRpcClientService,
} from '@ecommerce-microservices/core';
import { ApolloDriver } from '@nestjs/apollo';
import { FirebaseAuthService } from '@ecommerce-microservices/firebase-auth';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    constructor(
        private firebaseAuthService: FirebaseAuthService,
        private readonly catalog: CatalogsRpcClientService,
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
                const token = req.headers.authorization?.split('Bearer ')[1];
                let user = null;

                if (token) {
                    try {
                        // Verify and decode the Firebase token
                        const decodedToken =
                            await this.firebaseAuthService.verifyToken(token);
                        user = await this.firebaseAuthService.getUser(
                            decodedToken.uid,
                        );
                    } catch (error) {
                        console.error(
                            'Token verification failed:',
                            error.message,
                        );
                    }
                }

                return {
                    payload,
                    connection,
                    req,
                    rpc: {
                        catalog: this.catalog,
                        search: this.search,
                    },
                    user,
                };
            },
        };
    }
}
