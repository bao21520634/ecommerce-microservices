import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CategoryRepository } from '../../repositories';
import { GetCategoryQuery } from '../impl';
import { Category } from '@ecommerce-microservices/proto-schema';
import { CategoryStatus as PrismaCategoryStatus } from '@prisma/client';
import { mapEnum } from '@ecommerce-microservices/common';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
    constructor(private readonly categoryRepo: CategoryRepository) {}

    async execute(query: GetCategoryQuery): Promise<Category.NullableCategory> {
        try {
            const result = await this.categoryRepo.store.findFirst({
                where: {
                    id: query.id,
                },
            });

            return {
                data: result
                    ? {
                          ...result,
                          status: mapEnum(
                              Category.CategoryStatus,
                              PrismaCategoryStatus,
                              result.status,
                          ),
                      }
                    : undefined,
                null: result ? 0 : undefined,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
