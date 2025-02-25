import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventStoreModule } from '@ecommerce-microservices/event-store';
import { TerminusModule } from '@nestjs/terminus';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

import { CacheStoreConfigService, EventStoreConfigService } from '../services';
import { ClerkAuthGuard } from '@ecommerce-microservices/common';

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
        EventStoreModule.registerAsync({
            type: 'event-store',
            useClass: EventStoreConfigService,
        }),
        TerminusModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useClass: CacheStoreConfigService,
        }),
    ],
    exports: [
        ConfigModule,
        ScheduleModule,
        EventStoreModule.registerAsync({
            type: 'event-store',
            useClass: EventStoreConfigService,
        }),
        TerminusModule,
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useClass: CacheStoreConfigService,
        }),
    ],
    providers: [
        CacheStoreConfigService,
        EventStoreConfigService,
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
        {
            provide: 'CLERK_INIT',
            useFactory: (configService: ConfigService) => {
                process.env['CLERK_SECRET_KEY'] =
                    configService.get<string>('clerk.secret');
                return true;
            },
            inject: [ConfigService],
        },
    ],
})
export class ServiceRegistryModule {}
