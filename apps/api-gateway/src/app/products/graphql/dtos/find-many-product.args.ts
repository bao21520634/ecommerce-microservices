import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductWhereInput } from './product-where.input';
import { Type } from 'class-transformer';
import { ProductOrderByWithRelationInput } from './product-order-by-with-relation.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class FindManyProductArgs {
    @Field(() => ProductWhereInput, { nullable: true })
    @Type(() => ProductWhereInput)
    where?: ProductWhereInput;

    @Field(() => [ProductOrderByWithRelationInput], { nullable: true })
    orderBy?: Array<ProductOrderByWithRelationInput>;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}
