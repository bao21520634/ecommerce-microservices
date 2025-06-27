import { Common } from '@ecommerce-microservices/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class GetOrderItemsTotalQuery implements IQuery {
    constructor(public readonly query?: Common.Query) {}
}
