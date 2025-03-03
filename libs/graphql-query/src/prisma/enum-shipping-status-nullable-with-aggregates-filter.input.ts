import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShippingStatus } from './shipping-status.enum';
import { NestedEnumShippingStatusNullableWithAggregatesFilter } from './nested-enum-shipping-status-nullable-with-aggregates-filter.input';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';
import { NestedEnumShippingStatusNullableFilter } from './nested-enum-shipping-status-nullable-filter.input';

@InputType()
export class EnumShippingStatusNullableWithAggregatesFilter {

    @Field(() => ShippingStatus, {nullable:true})
    equals?: `${ShippingStatus}`;

    @Field(() => [ShippingStatus], {nullable:true})
    in?: Array<`${ShippingStatus}`>;

    @Field(() => [ShippingStatus], {nullable:true})
    notIn?: Array<`${ShippingStatus}`>;

    @Field(() => NestedEnumShippingStatusNullableWithAggregatesFilter, {nullable:true})
    not?: NestedEnumShippingStatusNullableWithAggregatesFilter;

    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: NestedIntNullableFilter;

    @Field(() => NestedEnumShippingStatusNullableFilter, {nullable:true})
    _min?: NestedEnumShippingStatusNullableFilter;

    @Field(() => NestedEnumShippingStatusNullableFilter, {nullable:true})
    _max?: NestedEnumShippingStatusNullableFilter;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
