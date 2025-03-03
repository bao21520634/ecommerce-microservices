import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryWhereInput } from './category-where.input';
import { Type } from 'class-transformer';
import { CategoryOrderByWithRelationInput } from './category-order-by-with-relation.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class FindManyCategoryArgs {
    @Field(() => CategoryWhereInput, { nullable: true })
    @Type(() => CategoryWhereInput)
    where?: CategoryWhereInput;

    @Field(() => [CategoryOrderByWithRelationInput], { nullable: true })
    orderBy?: Array<CategoryOrderByWithRelationInput>;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}
