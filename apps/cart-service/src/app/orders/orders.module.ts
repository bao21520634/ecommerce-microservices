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
import { OrdersController } from './orders.controller';
import {
    CacheStoreConfigService,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { OrderRepository } from './repositories';
import { OrderCommandHandlers } from './commands';
import { OrderQueryHandlers } from './queries/handlers';
import { EventBus } from '@nestjs/cqrs';

@Module({
    imports: [
        ServiceRegistryModule,
        EventStoreModule.registerFeature({
            type: 'event-store',
            featureStreamName: '$ce-cart',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-cart',
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
        ...OrderCommandHandlers,
        ...OrderQueryHandlers,
        OrderRepository,
        PrismaRepository,
        {
            provide: PRISMA_OPTIONS,
            useValue: {
                logQueries: true,
            },
        },
        {
            provide: 'order',
            useFactory: (prismaRepo: PrismaRepository) => prismaRepo.order,
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
    controllers: [OrdersController],
})
export class OrdersModule {}
