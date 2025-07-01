import { Module } from '@nestjs/common';
import {
    PRISMA_OPTIONS,
    PrismaModule,
    PrismaRepository,
} from '@ecommerce-microservices/prisma';
import { SettingsController } from './settings.controller';
import {
    CacheStoreConfigService,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { SettingRepository } from './repositories';
import { SettingCommandHandlers } from './commands';
import { SettingQueryHandlers } from './queries/handlers';
import { EventBus } from '@nestjs/cqrs';

@Module({
    imports: [
        ServiceRegistryModule,
        PrismaModule.register({
            logQueries: true,
        }),
    ],
    providers: [
        EventBus,
        ...SettingCommandHandlers,
        ...SettingQueryHandlers,
        SettingRepository,
        PrismaRepository,
        {
            provide: PRISMA_OPTIONS,
            useValue: {
                logQueries: true,
            },
        },
        {
            provide: 'setting',
            useFactory: (prismaRepo: PrismaRepository) => prismaRepo.setting,
            inject: [PrismaRepository],
        },
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
        CacheStoreConfigService,
    ],
    controllers: [SettingsController],
})
export class SettingsModule {}
