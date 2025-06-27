import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Product } from '@ecommerce-microservices/proto-schema';
import { GetProductQuery } from '../../impl';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Inject } from '@nestjs/common';
import { PRODUCT_INDEX } from '@ecommerce-microservices/core';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
    constructor(
        @Inject(ElasticsearchService)
        private readonly esService: ElasticsearchService,
    ) {}

    async execute(data: GetProductQuery): Promise<Product.NullableProduct> {
        try {
            const result = await this.esService.get({
                index: PRODUCT_INDEX,
                id: data.query.id,
            });

            if (!result.found) {
                return { data: null, null: undefined };
            }

            const product = result._source as Product.Product;

            return {
                data: {
                    ...product,
                    attributes: JSON.stringify(product.attributes),
                    variantAttributes: JSON.stringify(
                        product.variantAttributes,
                    ),
                },
                null: 0,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
