import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductType } from './product-type.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumProductTypeFilter } from './nested-enum-product-type-filter.input';

@InputType()
export class NestedEnumProductTypeWithAggregatesFilter {

    @Field(() => ProductType, {nullable:true})
    equals?: `${ProductType}`;

    @Field(() => [ProductType], {nullable:true})
    in?: Array<`${ProductType}`>;

    @Field(() => [ProductType], {nullable:true})
    notIn?: Array<`${ProductType}`>;

    @Field(() => NestedEnumProductTypeWithAggregatesFilter, {nullable:true})
    not?: NestedEnumProductTypeWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumProductTypeFilter, {nullable:true})
    _min?: NestedEnumProductTypeFilter;

    @Field(() => NestedEnumProductTypeFilter, {nullable:true})
    _max?: NestedEnumProductTypeFilter;
}
