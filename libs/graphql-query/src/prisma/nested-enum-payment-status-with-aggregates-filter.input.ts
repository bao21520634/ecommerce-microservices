import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentStatus } from './payment-status.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumPaymentStatusFilter } from './nested-enum-payment-status-filter.input';

@InputType()
export class NestedEnumPaymentStatusWithAggregatesFilter {

    @Field(() => PaymentStatus, {nullable:true})
    equals?: `${PaymentStatus}`;

    @Field(() => [PaymentStatus], {nullable:true})
    in?: Array<`${PaymentStatus}`>;

    @Field(() => [PaymentStatus], {nullable:true})
    notIn?: Array<`${PaymentStatus}`>;

    @Field(() => NestedEnumPaymentStatusWithAggregatesFilter, {nullable:true})
    not?: NestedEnumPaymentStatusWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumPaymentStatusFilter, {nullable:true})
    _min?: NestedEnumPaymentStatusFilter;

    @Field(() => NestedEnumPaymentStatusFilter, {nullable:true})
    _max?: NestedEnumPaymentStatusFilter;
}
