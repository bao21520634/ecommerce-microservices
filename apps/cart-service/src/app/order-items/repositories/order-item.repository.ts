import { Injectable, Inject } from '@nestjs/common';
import {
    PrismaRepository,
    PrismaModuleOptions,
    PRISMA_OPTIONS,
} from '@ecommerce-microservices/prisma';
import { Keyv } from 'keyv';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class OrderItemRepository extends PrismaRepository {
    public readonly store: PrismaClient['orderItem'];

    constructor(
        @Inject(PRISMA_OPTIONS) options: PrismaModuleOptions,
        @Inject('CACHE_INSTANCE') cache: Keyv,
    ) {
        super(options, cache);
        this.store = this.extendedClient.orderItem;
    }
}
