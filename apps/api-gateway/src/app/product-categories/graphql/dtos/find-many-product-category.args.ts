import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductCategoryWhereInput } from './product-category-where.input';
import { Type } from 'class-transformer';
import { ProductCategoryOrderByWithRelationInput } from './product-category-order-by-with-relation.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class FindManyProductCategoryArgs {
    @Field(() => ProductCategoryWhereInput, { nullable: true })
    @Type(() => ProductCategoryWhereInput)
    where?: ProductCategoryWhereInput;

    @Field(() => [ProductCategoryOrderByWithRelationInput], { nullable: true })
    orderBy?: Array<ProductCategoryOrderByWithRelationInput>;

    @Field(() => Int, { nullable: true })
    take?: number;

    @Field(() => Int, { nullable: true })
    skip?: number;
}
