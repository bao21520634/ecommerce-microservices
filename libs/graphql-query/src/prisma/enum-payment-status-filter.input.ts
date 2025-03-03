import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentStatus } from './payment-status.enum';
import { NestedEnumPaymentStatusFilter } from './nested-enum-payment-status-filter.input';

@InputType()
export class EnumPaymentStatusFilter {

    @Field(() => PaymentStatus, {nullable:true})
    equals?: `${PaymentStatus}`;

    @Field(() => [PaymentStatus], {nullable:true})
    in?: Array<`${PaymentStatus}`>;

    @Field(() => [PaymentStatus], {nullable:true})
    notIn?: Array<`${PaymentStatus}`>;

    @Field(() => NestedEnumPaymentStatusFilter, {nullable:true})
    not?: NestedEnumPaymentStatusFilter;
}
