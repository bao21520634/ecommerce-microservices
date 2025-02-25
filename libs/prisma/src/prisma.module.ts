import { DynamicModule, Module } from '@nestjs/common';
import { createRepositoryProviers } from './inject-repository.decorator';
import {
    createAsyncProviders,
    defaultPrismaOptions,
    PRISMA_OPTIONS,
    PrismaModuleAsyncOptions,
    PrismaModuleOptions,
} from './prisma.provider';
import { PrismaRepository } from './prisma.repository';
import { CacheStoreConfigService } from '@ecommerce-microservices/core';

@Module({})
export class PrismaModule {
    static register(options: PrismaModuleOptions): DynamicModule {
        const repositoryProviers = createRepositoryProviers();
        options = { ...defaultPrismaOptions, ...options };
        return {
            global: true,
            module: PrismaModule,
            providers: [
                {
                    provide: PRISMA_OPTIONS,
                    useValue: options,
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
                        throw new Error(
                            'Cache stores are not properly configured',
                        );
                    },
                    inject: [CacheStoreConfigService],
                },
                CacheStoreConfigService,
                PrismaRepository,
                ...repositoryProviers,
            ],
            exports: [...repositoryProviers, PrismaRepository],
        };
    }

    static registerAsync(options: PrismaModuleAsyncOptions): DynamicModule {
        const repositoryProviers = createRepositoryProviers();
        return {
            global: true,
            module: PrismaModule,
            imports: options.imports || [],
            providers: [
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
                        throw new Error(
                            'Cache stores are not properly configured',
                        );
                    },
                    inject: [CacheStoreConfigService],
                },
                ...createAsyncProviders(options),
                ...repositoryProviers,
                PrismaRepository,
            ],
            exports: [...repositoryProviers, PrismaRepository],
        };
    }
}
