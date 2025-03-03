import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProductCategoryCreateInput {
    @Field(() => String, { nullable: false })
    categoryId!: string;

    @Field(() => String, { nullable: false })
    productId!: string;
}
