import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Elastic } from '@ecommerce-microservices/proto-schema';
import { GetProductsFromCategoriesQuery } from '../../impl';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Inject } from '@nestjs/common';
import {
    CatalogsRpcClientService,
    PRODUCT_INDEX,
} from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { mapSearchResponse } from '../../../mappers';
import {
    HIGHLIGHT_PRODUCT_FIELDS,
    INCLUDED_PRODUCT_FIELDS,
} from '../../../constants';

@QueryHandler(GetProductsFromCategoriesQuery)
export class GetProductsFromCategoriesHandler
    implements IQueryHandler<GetProductsFromCategoriesQuery>
{
    constructor(
        @Inject(ElasticsearchService)
        private readonly esService: ElasticsearchService,
        private readonly catalogRpcService: CatalogsRpcClientService,
    ) {}

    async execute(
        data: GetProductsFromCategoriesQuery,
    ): Promise<Elastic.SearchResponse> {
        try {
            const {
                categoryIds,
                page,
                pageSize,
                filters = [],
                sortBy = [],
            } = data.query;

            const productCategorieIds = await lastValueFrom(
                this.catalogRpcService.svc.productCategories({
                    categoryIds: categoryIds,
                    productIds: [],
                }),
            );

            const productIds = productCategorieIds.productCategories.map(
                (pc) => pc.productId,
            );

            const from = (page - 1) * pageSize;
            const size = pageSize;

            const query: any = { bool: { must: [], filter: [] } };

            if (productIds.length > 0) {
                query.bool.must.push({
                    terms: { _id: productIds },
                });
            } else {
                return;
            }

            if (filters.length > 0) {
                for (const filter of filters) {
                    const [field, value] = filter.split(':');
                    if (field && value) {
                        query.bool.filter.push({
                            term: { [field]: value },
                        });
                    }
                }
            }

            const sort: any[] = [];
            if (sortBy.length > 0) {
                for (const sortField of sortBy) {
                    const [field, direction] = sortField.split(':');
                    if (field) {
                        sort.push({
                            [field]: {
                                order: direction === 'desc' ? 'desc' : 'asc',
                            },
                        });
                    }
                }
            } else {
                // Default sort by relevance
                sort.push({ _score: { order: 'desc' } });
            }

            const response = await this.esService.search({
                index: `${PRODUCT_INDEX}`,
                body: {
                    _source: {
                        includes: INCLUDED_PRODUCT_FIELDS,
                    },
                    query,
                    sort,
                    from,
                    size,
                    highlight: {
                        fields: HIGHLIGHT_PRODUCT_FIELDS,
                    },
                },
            });

            return mapSearchResponse(response, page, pageSize);
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
