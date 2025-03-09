import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventStoreModule } from '@ecommerce-microservices/event-store';
import { TerminusModule } from '@nestjs/terminus';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

import { CacheStoreConfigService, EventStoreConfigService } from '../services';
import { FirebaseAuthModule } from '@ecommerce-microservices/firebase-auth';
import { FirebaseAuthConfigService } from '../services/configs/firebase-auth-config.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from '../services/configs/elasticsearch-config.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [
                () => {
                    const config = yaml.load(
                        readFileSync(
                            resolve(
                                __dirname,
                                'assets',
                                `bootstrap-${
                                    process.env['NODE_ENV'] || 'development'
                                }.yaml`,
                            ),
                            'utf8',
                        ),
                    ) as Record<string, any>;

                    return config;
                },
            ],
            envFilePath: [
                `.env.${process.env['NODE_ENV'] || 'development'}.local`,
                `.env.${process.env['NODE_ENV'] || 'development'}`,
                '.env.local',
                '.env',
            ],
        }),
        ScheduleModule.forRoot(),
        TerminusModule,
        EventStoreModule.registerAsync({
            type: 'event-store',
            useClass: EventStoreConfigService,
        }),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useClass: CacheStoreConfigService,
        }),
        FirebaseAuthModule.registerAsync({
            imports: [ConfigModule],
            useClass: FirebaseAuthConfigService,
        }),
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    exports: [
        ConfigModule,
        ScheduleModule,
        TerminusModule,
        FirebaseAuthModule,
        EventStoreModule.registerAsync({
            type: 'event-store',
            useClass: EventStoreConfigService,
        }),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useClass: CacheStoreConfigService,
        }),
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
    ],
    providers: [
        CacheStoreConfigService,
        EventStoreConfigService,
        FirebaseAuthConfigService,
        ElasticsearchConfigService,
        {
            provide: 'CACHE_INSTANCE',
            useFactory: (cacheConfig: CacheStoreConfigService) => {
                const options = cacheConfig.createCacheOptions();
                if (
                    Array.isArray(options.stores) &&
                    options.stores.length > 1
                ) {
                    return options.stores[1]; // Use Redis store
                }
                throw new Error('Cache stores are not properly configured');
            },
            inject: [CacheStoreConfigService],
        },
    ],
})
export class ServiceRegistryModule {}
