import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { ConfigService } from '@nestjs/config';
import { RedisConfig } from '@ecommerce-microservices/common';

@Injectable()
export class CacheStoreConfigService implements CacheOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createCacheOptions(): CacheModuleOptions {
        const redisOptions = this.configService.get<RedisConfig>('redis');
        const caching = this.configService.get<{ ttl: number; max: number }>(
            'caching',
        );

        const redisStore = createKeyv(
            `redis://${redisOptions?.host}:${redisOptions?.port}`,
        );

        return {
            stores: [
                new Keyv({
                    store: new CacheableMemory({
                        ttl: caching?.ttl,
                        lruSize: caching?.max,
                    }),
                }),
                redisStore,
            ],
        };
    }
}
