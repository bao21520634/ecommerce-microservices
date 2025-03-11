import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { Common } from '@ecommerce-microservices/proto-schema';
import { SearchQuery } from '../impl';
import { Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { mapSearchResponse } from '../../mappers';
import { CATEGORY_INDEX, PRODUCT_INDEX } from '@ecommerce-microservices/core';

@QueryHandler(SearchQuery)
export class SearchHandler implements IQueryHandler<SearchQuery> {
    constructor(
        @Inject(ElasticsearchService)
        private readonly esService: ElasticsearchService,
    ) {}

    async execute(data: SearchQuery): Promise<Common.SearchResponse> {
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
                index: `${PRODUCT_INDEX},${CATEGORY_INDEX}`,
                ignore_unavailable: true,
                body: {
                    query,
                    sort,
                    from,
                    size,
                    highlight: {
                        fields: {
                            name: {},
                            shortDescription: {},
                            longDescription: {},
                            metaTitle: {},
                            metaDescription: {},
                            metaKeywords: {},
                        },
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
