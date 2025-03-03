import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShippingStatus } from './shipping-status.enum';

@InputType()
export class NestedEnumShippingStatusNullableFilter {

    @Field(() => ShippingStatus, {nullable:true})
    equals?: `${ShippingStatus}`;

    @Field(() => [ShippingStatus], {nullable:true})
    in?: Array<`${ShippingStatus}`>;

    @Field(() => [ShippingStatus], {nullable:true})
    notIn?: Array<`${ShippingStatus}`>;

    @Field(() => NestedEnumShippingStatusNullableFilter, {nullable:true})
    not?: NestedEnumShippingStatusNullableFilter;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
