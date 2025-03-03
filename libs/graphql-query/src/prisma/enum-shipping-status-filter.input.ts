import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShippingStatus } from './shipping-status.enum';

@InputType()
export class EnumShippingStatusFilter {

    @Field(() => ShippingStatus, {nullable:true})
    equals?: `${ShippingStatus}`;

    @Field(() => [ShippingStatus], {nullable:true})
    in?: Array<`${ShippingStatus}`>;

    @Field(() => [ShippingStatus], {nullable:true})
    notIn?: Array<`${ShippingStatus}`>;

    @Field(() => EnumShippingStatusFilter, {nullable:true})
    not?: EnumShippingStatusFilter;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
