import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProductCategoryWhereInput {
    @Field(() => [String], { nullable: true })
    categoryIds?: Array<string>;

    @Field(() => [String], { nullable: true })
    productIds?: Array<string>;
}
