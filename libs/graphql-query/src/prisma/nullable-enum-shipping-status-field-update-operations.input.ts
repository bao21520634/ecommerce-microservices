import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ShippingStatus } from './shipping-status.enum';

@InputType()
export class NullableEnumShippingStatusFieldUpdateOperationsInput {

    @Field(() => ShippingStatus, {nullable:true})
    set?: `${ShippingStatus}`;

    @Field(() => Boolean, {nullable:true})
    unset?: boolean;
}
