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
import { ProductCategoriesController } from './product-categories.controller';
import {
    CacheStoreConfigService,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { ProductCategoryRepository } from './repositories';
import { ProductCategoryCommandHandlers } from './commands';
import { ProductCategoryQueryHandlers } from './queries/handlers';
import { ProductCategoryEventHandlers } from './events';
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
        ...ProductCategoryCommandHandlers,
        ...ProductCategoryQueryHandlers,
        ...ProductCategoryEventHandlers,
        ProductCategoryRepository,
        PrismaRepository,
        {
            provide: PRISMA_OPTIONS,
            useValue: {
                logQueries: true,
            },
        },
        {
            provide: 'productCategory',
            useFactory: (prismaRepo: PrismaRepository) =>
                prismaRepo.productCategory,
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
    controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
