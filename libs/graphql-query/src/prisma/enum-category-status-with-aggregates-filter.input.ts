import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryStatus } from './category-status.enum';
import { NestedEnumCategoryStatusWithAggregatesFilter } from './nested-enum-category-status-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumCategoryStatusFilter } from './nested-enum-category-status-filter.input';

@InputType()
export class EnumCategoryStatusWithAggregatesFilter {

    @Field(() => CategoryStatus, {nullable:true})
    equals?: `${CategoryStatus}`;

    @Field(() => [CategoryStatus], {nullable:true})
    in?: Array<`${CategoryStatus}`>;

    @Field(() => [CategoryStatus], {nullable:true})
    notIn?: Array<`${CategoryStatus}`>;

    @Field(() => NestedEnumCategoryStatusWithAggregatesFilter, {nullable:true})
    not?: NestedEnumCategoryStatusWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumCategoryStatusFilter, {nullable:true})
    _min?: NestedEnumCategoryStatusFilter;

    @Field(() => NestedEnumCategoryStatusFilter, {nullable:true})
    _max?: NestedEnumCategoryStatusFilter;
}
