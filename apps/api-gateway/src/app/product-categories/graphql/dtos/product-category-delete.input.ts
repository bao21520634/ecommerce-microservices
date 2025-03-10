import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProductCategoryDeleteInput {
    @Field(() => String, { nullable: false })
    categoryId!: string;

    @Field(() => String, { nullable: false })
    productId!: string;
}
