import {
    CacheStoreConfigService,
    CatalogsRpcClientService,
    CoreModule,
    ServiceRegistryModule,
} from '@ecommerce-microservices/core';
import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './configs';
import {
    EventStoreModule,
    EventStoreSubscriptionType,
} from '@ecommerce-microservices/event-store';
import { EventBus } from '@nestjs/cqrs';
import { SearchQueryHandlers } from './queries';
import { SearchController } from './app.controller';

@Module({
    imports: [
        CoreModule,
        ServiceRegistryModule,
        ElasticsearchModule.registerAsync({
            useClass: ElasticsearchConfigService,
        }),
        EventStoreModule.registerFeature({
            type: 'event-store',
            featureStreamName: '$ce-search',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-search',
                },
            ],
            eventHandlers: null,
        }),
    ],
    controllers: [SearchController],
    providers: [
        ...SearchQueryHandlers,
        EventBus,
        ElasticsearchConfigService,
        CatalogsRpcClientService,
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
})
export class AppModule {}
