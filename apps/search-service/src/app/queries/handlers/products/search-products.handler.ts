import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Elastic } from '@ecommerce-microservices/proto-schema';
import { Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { mapSearchResponse } from '../../../mappers';
import { PRODUCT_INDEX } from '@ecommerce-microservices/core';
import {
    HIGHLIGHT_PRODUCT_FIELDS,
    INCLUDED_PRODUCT_FIELDS,
} from '../../../constants';
import { SearchProductsQuery } from '../../impl';

@QueryHandler(SearchProductsQuery)
export class SearchProductsHandler
    implements IQueryHandler<SearchProductsQuery>
{
    constructor(
        @Inject(ElasticsearchService)
        private readonly esService: ElasticsearchService,
    ) {}

    async execute(data: SearchProductsQuery): Promise<Elastic.SearchResponse> {
        try {
            const {
                queryString,
                page,
                pageSize,
                filters = [],
                sortBy = [],
            } = data.query;

            const from = (page - 1) * pageSize;
            const size = pageSize;

            const query: any = {
                bool: {
                    must: [
                        queryString
                            ? {
                                  multi_match: {
                                      query: queryString,
                                      fields: ['*'],
                                      type: 'best_fields',
                                      fuzziness: 'AUTO',
                                  },
                              }
                            : { match_all: {} },
                    ],
                    filter: [],
                },
            };

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
                ignore_unavailable: true,
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
                    aggs: {
                        // categories: {
                        //     terms: { field: 'category.keyword', size: 10 },
                        // },
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
