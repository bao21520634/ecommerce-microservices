import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrderItemWhereInput } from './order-item-where.input';
import { Type } from 'class-transformer';
import { OrderItemOrderByWithRelationInput } from './order-item-order-by-with-relation.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class FindManyOrderItemArgs {
    @Field(() => OrderItemWhereInput, { nullable: true })
    @Type(() => OrderItemWhereInput)
    where?: OrderItemWhereInput;

    @Field(() => [OrderItemOrderByWithRelationInput], { nullable: true })
    orderBy?: Array<OrderItemOrderByWithRelationInput>;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}
