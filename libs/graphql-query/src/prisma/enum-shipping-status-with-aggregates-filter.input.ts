import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShippingStatus } from './shipping-status.enum';
import { IntFilter } from './int-filter.input';
import { EnumShippingStatusFilter } from './enum-shipping-status-filter.input';

@InputType()
export class EnumShippingStatusWithAggregatesFilter {

    @Field(() => ShippingStatus, {nullable:true})
    equals?: `${ShippingStatus}`;

    @Field(() => [ShippingStatus], {nullable:true})
    in?: Array<`${ShippingStatus}`>;

    @Field(() => [ShippingStatus], {nullable:true})
    notIn?: Array<`${ShippingStatus}`>;

    @Field(() => EnumShippingStatusWithAggregatesFilter, {nullable:true})
    not?: EnumShippingStatusWithAggregatesFilter;

    @Field(() => IntFilter, {nullable:true})
    _count?: IntFilter;

    @Field(() => EnumShippingStatusFilter, {nullable:true})
    _min?: EnumShippingStatusFilter;

    @Field(() => EnumShippingStatusFilter, {nullable:true})
    _max?: EnumShippingStatusFilter;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
