import { Common } from '@ecommerce-microservices/proto-schema';
import { IQuery } from '@nestjs/cqrs';

export class GetOrdersTotalQuery implements IQuery {
    constructor(public readonly query?: Common.Query) {}
}
