import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentStatus } from './payment-status.enum';

@InputType()
export class NestedEnumPaymentStatusFilter {

    @Field(() => PaymentStatus, {nullable:true})
    equals?: `${PaymentStatus}`;

    @Field(() => [PaymentStatus], {nullable:true})
    in?: Array<`${PaymentStatus}`>;

    @Field(() => [PaymentStatus], {nullable:true})
    notIn?: Array<`${PaymentStatus}`>;

    @Field(() => NestedEnumPaymentStatusFilter, {nullable:true})
    not?: NestedEnumPaymentStatusFilter;
}
