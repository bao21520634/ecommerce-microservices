import { Module } from '@nestjs/common';
import {
    EventStoreSubscriptionType,
    EventStoreModule,
} from '@ecommerce-microservices/event-store';
import {
    PRISMA_OPTIONS,
    PrismaModule,
    PrismaRepository,
} from '@ecommerce-microservices/prisma';
import { CategoriesController } from './categories.controller';
import {
    CacheStoreConfigService,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { CategoryRepository } from './repositories';
import { CategoryCommandHandlers } from './commands';
import { CategoryQueryHandlers } from './queries/handlers';
import { CategoryEventHandlers } from './events';
import { EventBus } from '@nestjs/cqrs';

@Module({
    imports: [
        ServiceRegistryModule,
        EventStoreModule.registerFeature({
            type: 'event-store',
            featureStreamName: '$ce-catalog',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-catalog',
                },
            ],
            eventHandlers: null,
        }),
        PrismaModule.register({
            logQueries: true,
        }),
    ],
    providers: [
        EventBus,
        ...CategoryCommandHandlers,
        ...CategoryQueryHandlers,
        ...CategoryEventHandlers,
        CategoryRepository,
        PrismaRepository,
        {
            provide: PRISMA_OPTIONS,
            useValue: {
                logQueries: true,
            },
        },
        {
            provide: 'category',
            useFactory: (prismaRepo: PrismaRepository) => prismaRepo.category,
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
    controllers: [CategoriesController],
})
export class CategoriesModule {}
