import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Category } from '@ecommerce-microservices/proto-schema';
import { GetCategoryQuery } from '../../impl';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Inject } from '@nestjs/common';
import { CATEGORY_INDEX } from '@ecommerce-microservices/core';

@QueryHandler(GetCategoryQuery)
export class GetCategoryHandler implements IQueryHandler<GetCategoryQuery> {
    constructor(
        @Inject(ElasticsearchService)
        private readonly esService: ElasticsearchService,
    ) {}

    async execute(data: GetCategoryQuery): Promise<Category.NullableCategory> {
        try {
            const result = await this.esService.get({
                index: CATEGORY_INDEX,
                id: data.query.id,
            });

            if (!result.found) {
                return { data: null, null: undefined };
            }

            const category = result._source as Category.Category;

            return {
                data: category,
                null: 0,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
