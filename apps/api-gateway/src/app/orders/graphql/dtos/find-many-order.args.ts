import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrderWhereInput } from './order-where.input';
import { Type } from 'class-transformer';
import { OrderOrderByWithRelationInput } from './order-order-by-with-relation.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class FindManyOrderArgs {
    @Field(() => OrderWhereInput, { nullable: true })
    @Type(() => OrderWhereInput)
    where?: OrderWhereInput;

    @Field(() => [OrderOrderByWithRelationInput], { nullable: true })
    orderBy?: Array<OrderOrderByWithRelationInput>;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}
