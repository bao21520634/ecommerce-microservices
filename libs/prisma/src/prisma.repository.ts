import {
    Inject,
    Injectable,
    Logger,
    OnModuleInit,
    INestMicroservice,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPrismaQueryEventHandler } from 'prisma-query-log';
import { PRISMA_OPTIONS, PrismaModuleOptions } from './prisma.provider';
import { Keyv } from 'keyv';
import superjson from 'superjson';

@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger();
    protected extendedClient: PrismaClient;

    constructor(
        @Inject(PRISMA_OPTIONS) options: PrismaModuleOptions,
        @Inject('CACHE_INSTANCE') private readonly cache: Keyv,
    ) {
        super({
            errorFormat: 'minimal',
            log: options.logQueries
                ? [{ level: 'query', emit: 'event' }]
                : undefined,
        });

        if (options.logQueries) {
            (this.$on as any)(
                'query',
                createPrismaQueryEventHandler({
                    logger: (query: any) => {
                        this.logger.verbose(query, 'PrismaClient');
                    },
                    format: false,
                    colorQuery: '\u001B[96m',
                    colorParameter: '\u001B[90m',
                }),
            );
        }

        this.extendedClient = this.initializeExtensions(this);
    }

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestMicroservice) {
        (this.$on as any)('beforeExit', async () => {
            await app.close();
        });
    }

    /**
     * Converts a gRPC query object into a Prisma query object.
     * @param query The gRPC query with filter, paging, and sorting.
     * @returns A Prisma query object containing where, skip, take, and orderBy.
     */
    public fromQueryGrpcToPrisma(query: {
        filter?: string;
        paging?: {
            limit?: number;
            offset?: number;
        };
        sorting?: {
            field: string;
            direction?: number; //  0 for ASC, 1 for DESC
        }[];
    }): {
        where?: any;
        skip?: number;
        take?: number;
        orderBy?: any;
    } {
        if (!query) return {};

        const prismaQuery: {
            where?: any;
            skip?: number;
            take?: number;
            orderBy?: any;
        } = {};

        // Filter conversion (assuming it's JSON)
        if (typeof query.filter === 'string') {
            try {
                prismaQuery.where = JSON.parse(query.filter);
            } catch (error) {
                this.logger.error('Error parsing filter JSON:', error);
            }
        }

        // Paging: map limit and offset to take and skip
        if (query.paging) {
            prismaQuery.take = query.paging.limit ?? undefined;
            prismaQuery.skip = query.paging.offset ?? undefined;
        }

        // Sorting: map to Prisma's expected format
        if (query.sorting?.length) {
            const orderBy: any = {};

            query.sorting.forEach((sort) => {
                orderBy[sort.field] = sort.direction === 1 ? 'desc' : 'asc';
            });

            prismaQuery.orderBy = orderBy;
        }

        return prismaQuery;
    }

    private initializeExtensions(client: PrismaClient): PrismaClient {
        const handleQueryWithCache = this.handleQueryWithCache.bind(this);
        const clearCache = this.clearCache.bind(this);

        return client.$extends({
            query: {
                $allModels: {
                    async findUnique({ args, query, model }) {
                        return await handleQueryWithCache(
                            model,
                            'findUnique',
                            args,
                            query,
                        );
                    },
                    async findFirst({ args, query, model }) {
                        return await handleQueryWithCache(
                            model,
                            'findFirst',
                            args,
                            query,
                        );
                    },
                    async findMany({ args, query, model }) {
                        return await handleQueryWithCache(
                            model,
                            'findMany',
                            args,
                            query,
                        );
                    },
                    async aggregate({ args, query, model }) {
                        return await handleQueryWithCache(
                            model,
                            'aggregate',
                            args,
                            query,
                        );
                    },
                    async groupBy({ args, query, model }) {
                        return await handleQueryWithCache(
                            model,
                            'groupBy',
                            args,
                            query,
                        );
                    },
                    async count({ args, query, model }) {
                        return await handleQueryWithCache(
                            model,
                            'count',
                            args,
                            query,
                        );
                    },
                    async create({ args, query, model }) {
                        const result = await query(args);
                        await clearCache(model);
                        return result;
                    },
                    async update({ args, query, model }) {
                        const result = await query(args);
                        await clearCache(model);
                        return result;
                    },
                    async delete({ args, query, model }) {
                        const result = await query(args);
                        await clearCache(model);
                        return result;
                    },
                    async upsert({ args, query, model }) {
                        const result = await query(args);
                        await clearCache(model);
                        return result;
                    },
                },
            },
        }) as PrismaClient;
    }

    private async handleQueryWithCache(
        model: string,
        operation: string,
        args: any,
        query: any,
    ) {
        const cacheKey = this.generateCacheKey(model, operation, args);
        const cached = await this.retrieveFromCache(cacheKey);

        if (cached) {
            this.logger.debug(`Cache hit for ${cacheKey}`);
            return cached;
        }

        this.logger.debug(`Cache miss for ${cacheKey}`);
        const result = await query(args);
        if (result) {
            await this.saveToCache(cacheKey, result);
        }

        return result;
    }

    private generateCacheKey(
        model: string,
        operation: string,
        args: any,
    ): string {
        // Sort the keys to ensure consistent caching regardless of object key order
        const argsString = superjson.stringify(args);

        return `prisma:${model}:${operation}:${argsString}`;
    }

    private async retrieveFromCache<T>(key: string): Promise<T | null> {
        try {
            const cached = await this.cache.get(key);
            if (!cached) return null;

            return superjson.parse(cached) as T;
        } catch (error) {
            this.logger.error('Cache retrieval error:', error);
            return null;
        }
    }

    private async saveToCache(
        key: string,
        data: any,
        ttl?: number,
    ): Promise<void> {
        try {
            const value =
                typeof data === 'string' ? data : superjson.stringify(data);
            await this.cache.set(key, value, ttl);

            // Track cache keys
            const cacheKeySetKey = 'prisma:cacheKeys';
            const cacheKeys = (await this.cache.get(cacheKeySetKey)) || {};
            const model = key.split(':')[1];

            if (!cacheKeys[model]) {
                cacheKeys[model] = new Set();
            }
            cacheKeys[model].add(key);

            await this.cache.set(cacheKeySetKey, cacheKeys);
        } catch (error) {
            this.logger.error('Cache save error:', error);
        }
    }

    private async clearCache(model?: string): Promise<void> {
        try {
            const cacheKeySetKey = 'prisma:cacheKeys';
            const cacheKeys = (await this.cache.get(cacheKeySetKey)) || {};

            if (model) {
                const modelKeys = cacheKeys[model] || [];
                for (const key of modelKeys) {
                    await this.cache.delete(key);
                }
                delete cacheKeys[model];
                await this.cache.set(cacheKeySetKey, cacheKeys);
                this.logger.debug(`Cleared cache for model: ${model}`);
            } else {
                await this.cache.clear();
                await this.cache.delete(cacheKeySetKey);
                this.logger.debug('Cleared entire cache');
            }
        } catch (error) {
            this.logger.error('Cache clear error:', error);
        }
    }
}
