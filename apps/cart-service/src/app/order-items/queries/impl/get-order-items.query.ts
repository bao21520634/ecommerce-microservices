import { Common } from '@ecommerce-microservices/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class GetOrderItemsQuery implements IQuery {
    constructor(public readonly query?: Common.Query) {}
}
