import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethod } from './payment-method.enum';
import { NestedEnumPaymentMethodWithAggregatesFilter } from './nested-enum-payment-method-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumPaymentMethodFilter } from './nested-enum-payment-method-filter.input';

@InputType()
export class EnumPaymentMethodWithAggregatesFilter {

    @Field(() => PaymentMethod, {nullable:true})
    equals?: `${PaymentMethod}`;

    @Field(() => [PaymentMethod], {nullable:true})
    in?: Array<`${PaymentMethod}`>;

    @Field(() => [PaymentMethod], {nullable:true})
    notIn?: Array<`${PaymentMethod}`>;

    @Field(() => NestedEnumPaymentMethodWithAggregatesFilter, {nullable:true})
    not?: NestedEnumPaymentMethodWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumPaymentMethodFilter, {nullable:true})
    _min?: NestedEnumPaymentMethodFilter;

    @Field(() => NestedEnumPaymentMethodFilter, {nullable:true})
    _max?: NestedEnumPaymentMethodFilter;
}
