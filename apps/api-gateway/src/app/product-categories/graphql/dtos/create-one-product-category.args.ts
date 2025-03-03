import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductCategoryCreateInput } from './product-category-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneProductCategoryArgs {
    @Field(() => ProductCategoryCreateInput, { nullable: false })
    @Type(() => ProductCategoryCreateInput)
    data!: ProductCategoryCreateInput;
}
