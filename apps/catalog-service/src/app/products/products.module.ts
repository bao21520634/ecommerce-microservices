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
import { ProductsController } from './products.controller';
import {
    CacheStoreConfigService,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { ProductRepository } from './repositories';
import { ProductCommandHandlers } from './commands';
import { ProductQueryHandlers } from './queries/handlers';
import { ClerkAuthGuard } from '@ecommerce-microservices/common';

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
        ...ProductCommandHandlers,
        ...ProductQueryHandlers,
        ProductRepository,
        PrismaRepository,
        ClerkAuthGuard,
        {
            provide: PRISMA_OPTIONS,
            useValue: {
                logQueries: true,
            },
        },
        {
            provide: 'product',
            useFactory: (prismaRepo: PrismaRepository) => prismaRepo.product,
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
    controllers: [ProductsController],
})
export class ProductsModule {}
