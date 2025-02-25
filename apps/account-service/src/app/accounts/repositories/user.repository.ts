import { Injectable, Inject, Logger } from '@nestjs/common';
import {
    PrismaRepository,
    PrismaModuleOptions,
    PRISMA_OPTIONS,
} from '@ecommerce-microservices/prisma';
import { Keyv } from 'keyv';
import { Prisma, PrismaClient } from '@prisma/client';
import { generateHashedPassword } from '@ecommerce-microservices/common';
import { User } from '@ecommerce-microservices/proto-schema';

@Injectable()
export class UserRepository extends PrismaRepository {
    public readonly store: PrismaClient['user'];
    private readonly prisma: PrismaClient;

    constructor(
        @Inject(PRISMA_OPTIONS) options: PrismaModuleOptions,
        @Inject('CACHE_INSTANCE') cache: Keyv,
    ) {
        super(options, cache);
        this.prisma = new PrismaClient();
        this.store = this.initializeUserExtensions();
        this.createTTLIndexes();
    }

    private initializeUserExtensions(): Prisma.UserDelegate {
        return this.$extends({
            query: {
                user: {
                    async create({ args, query }) {
                        const userServices = args.data
                            .services as unknown as User.AuthServices;

                        if (userServices.password.hashed) {
                            userServices.password.hashed =
                                await generateHashedPassword(
                                    userServices.password.hashed,
                                );
                        }
                        return query(args);
                    },
                    async createMany({ args, query }) {
                        if (args.data) {
                            const data = Array.isArray(args.data)
                                ? args.data
                                : [args.data];
                            for (const user of data) {
                                const userServices =
                                    user.services as unknown as User.AuthServices;

                                if (userServices.password.hashed) {
                                    userServices.password.hashed =
                                        await generateHashedPassword(
                                            userServices.password.hashed,
                                        );
                                }
                            }
                        }
                        return query(args);
                    },
                    async update({ args, query }) {
                        const userServices = args.data
                            .services as unknown as User.AuthServices;

                        if (userServices.password.hashed) {
                            userServices.password.hashed =
                                await generateHashedPassword(
                                    userServices.password.hashed,
                                );
                        }
                        return query(args);
                    },
                    async updateMany({ args, query }) {
                        if (args.data) {
                            const data = Array.isArray(args.data)
                                ? args.data
                                : [args.data];
                            for (const user of data) {
                                const userServices =
                                    user.services as unknown as User.AuthServices;

                                if (userServices.password.hashed) {
                                    userServices.password.hashed =
                                        await generateHashedPassword(
                                            userServices.password.hashed,
                                        );
                                }
                            }
                        }
                        return query(args);
                    },
                    async upsert({ args, query }) {
                        const userCreateServices = args.create
                            .services as unknown as User.AuthServices;

                        if (userCreateServices.password.hashed) {
                            userCreateServices.password.hashed =
                                await generateHashedPassword(
                                    userCreateServices.password.hashed,
                                );
                        }

                        const userUpdateServices = args.update
                            .services as unknown as User.AuthServices;
                        if (userUpdateServices.password.hashed) {
                            userUpdateServices.password.hashed =
                                await generateHashedPassword(
                                    userUpdateServices.password.hashed,
                                );
                        }
                        return query(args);
                    },
                },
            },
        }).user as Prisma.UserDelegate;
    }

    private async createTTLIndexes() {
        try {
            await this.prisma.$runCommandRaw({
                createIndexes: 'Email',
                indexes: [
                    {
                        key: { createdAt: 1 },
                        name: 'createdAt_TTL',
                        expireAfterSeconds: 60 * 60,
                    },
                ],
            });

            Logger.log('`Email` TTL indexes created successfully.');
        } catch (error) {
            Logger.error('Error creating TTL indexes:', error);
        }
    }
}
