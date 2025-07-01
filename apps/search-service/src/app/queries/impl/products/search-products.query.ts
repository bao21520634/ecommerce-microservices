import { Elastic } from '@ecommerce-microservices/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class SearchProductsQuery implements IQuery {
    constructor(public readonly query?: Elastic.SearchParams) {}
}
