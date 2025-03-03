import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductType } from './product-type.enum';

@InputType()
export class NestedEnumProductTypeFilter {

    @Field(() => ProductType, {nullable:true})
    equals?: `${ProductType}`;

    @Field(() => [ProductType], {nullable:true})
    in?: Array<`${ProductType}`>;

    @Field(() => [ProductType], {nullable:true})
    notIn?: Array<`${ProductType}`>;

    @Field(() => NestedEnumProductTypeFilter, {nullable:true})
    not?: NestedEnumProductTypeFilter;
}
