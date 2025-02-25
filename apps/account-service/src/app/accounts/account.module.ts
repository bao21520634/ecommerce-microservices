import { Module } from '@nestjs/common';
import {
    EventStoreSubscriptionType,
    EventStoreModule,
} from '@ecommerce-microservices/event-store';
import { AccountController } from './account.controller';
import { AccountSaga } from './sagas';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import {
    BillingEventHandlers,
    CacheStoreConfigService,
    JwtConfigService,
    ServiceRegistryModule,
    StripeUserCreatedEvent,
} from '@ecommerce-microservices/core';
import { AccountCommandHandlers } from './commands';
import { AccountQueryHandlers } from './queries';
import {
    AccountEventHandlers,
    EmailVerifiedEvent,
    UserLoggedInEvent,
    UserRegisteredEvent,
} from './events';
import {
    PRISMA_OPTIONS,
    PrismaModule,
    PrismaRepository,
} from '@ecommerce-microservices/prisma';

@Module({
    imports: [
        ServiceRegistryModule,
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
        EventStoreModule.registerFeature({
            type: 'event-store',
            featureStreamName: '$ce-account',
            subscriptions: [
                {
                    type: EventStoreSubscriptionType.Volatile,
                    stream: '$ce-account',
                },
            ],
            eventHandlers: {
                UserLoggedInEvent: (data) => new UserLoggedInEvent(data),
                UserRegisteredEvent: (data) => new UserRegisteredEvent(data),
                EmailVerifiedEvent: (data) => new EmailVerifiedEvent(data),
            },
        }),
        PrismaModule.register({
            logQueries: true,
        }),
    ],
    providers: [
        AccountSaga,
        ...AccountCommandHandlers,
        ...AccountQueryHandlers,
        ...AccountEventHandlers,
        ...BillingEventHandlers,
        UserRepository,
        PrismaRepository,
        {
            provide: PRISMA_OPTIONS,
            useValue: {
                logQueries: true,
            },
        },
        {
            provide: 'user',
            useFactory: (prismaRepo: PrismaRepository) => prismaRepo.user,
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
    controllers: [AccountController],
})
export class AccountModule {}
