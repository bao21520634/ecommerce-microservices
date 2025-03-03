import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductCategoryDeleteInput } from './product-category-delete.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneProductCategoryArgs {
    @Field(() => ProductCategoryDeleteInput, { nullable: false })
    @Type(() => ProductCategoryDeleteInput)
    data!: ProductCategoryDeleteInput;
}
