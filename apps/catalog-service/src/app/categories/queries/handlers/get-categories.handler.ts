import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CategoryRepository } from '../../repositories';
import { Category } from '@ecommerce-microservices/proto-schema';
import { CategoryStatus as PrismaCategoryStatus } from '@prisma/client';
import { mapEnum } from '@ecommerce-microservices/common';
import { GetCategoriesQuery } from '../impl';

@QueryHandler(GetCategoriesQuery)
export class GetCategoriesHandler implements IQueryHandler<GetCategoriesQuery> {
    constructor(private readonly categoryRepo: CategoryRepository) {}

    async execute(data: GetCategoriesQuery): Promise<Category.Categories> {
        try {
            const prismaQuery = this.categoryRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.categoryRepo.store.findMany({
                where: prismaQuery.where,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                orderBy: prismaQuery.orderBy,
            });

            return {
                categories: result.map((category) => ({
                    ...category,
                    status: mapEnum(
                        Category.CategoryStatus,
                        PrismaCategoryStatus,
                        category.status,
                    ),
                })),
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
