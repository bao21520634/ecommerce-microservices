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

@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger();
    private extendedClient: PrismaClient;

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
            direction: number; // e.g. 0 for ASC, 1 for DESC
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

        // Sorting: map each sort field to Prisma's orderBy format
        if (query.sorting?.length) {
            prismaQuery.orderBy = query.sorting.map((sort) => ({
                [sort.field]: sort.direction === 1 ? 'DESC' : 'ASC',
            }));
        }

        return prismaQuery;
    }

    private initializeExtensions(client: PrismaClient): PrismaClient {
        const handleQueryWithCache = this.handleQueryWithCache.bind(this);
        const clearCache = this.clearCache.bind(this);

        return client.$extends({
            query: {
                $allModels: {
                    async findUnique({ args, query }) {
                        return await handleQueryWithCache(
                            'findUnique',
                            args,
                            query,
                        );
                    },
                    async findFirst({ args, query }) {
                        return await handleQueryWithCache(
                            'findFirst',
                            args,
                            query,
                        );
                    },
                    async findMany({ args, query }) {
                        return await handleQueryWithCache(
                            'findMany',
                            args,
                            query,
                        );
                    },
                    async aggregate({ args, query }) {
                        return await handleQueryWithCache(
                            'aggregate',
                            args,
                            query,
                        );
                    },
                    async groupBy({ args, query }) {
                        return await handleQueryWithCache(
                            'groupBy',
                            args,
                            query,
                        );
                    },
                    async count({ args, query }) {
                        return await handleQueryWithCache('count', args, query);
                    },
                    async create({ args, query }) {
                        const result = await query(args);
                        await clearCache();
                        return result;
                    },
                    async update({ args, query }) {
                        const result = await query(args);
                        await clearCache();
                        return result;
                    },
                    async delete({ args, query }) {
                        const result = await query(args);
                        await clearCache();
                        return result;
                    },
                },
            },
        }) as PrismaClient;
    }

    private async handleQueryWithCache(
        operation: string,
        args: any,
        query: any,
    ) {
        const cacheKey = this.generateCacheKey(operation, args);
        const cached = await this.retrieveFromCache(cacheKey);

        if (cached) return cached;

        const result = await query(args);
        if (result) {
            await this.saveToCache(cacheKey, result);
        }

        return result;
    }

    private generateCacheKey(operation: string, args: any): string {
        return `prisma:${operation}:${JSON.stringify(args)}`;
    }

    private async retrieveFromCache<T>(key: string): Promise<T | null> {
        try {
            const cached = await this.cache.get(key);
            return cached ? (JSON.parse(cached) as T) : null;
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
            await this.cache.set(key, JSON.stringify(data), ttl);
        } catch (error) {
            this.logger.error('Cache save error:', error);
        }
    }

    private async clearCache(): Promise<void> {
        try {
            await this.cache.clear();
        } catch (error) {
            this.logger.error('Cache clear error:', error);
        }
    }
}
