import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutStatus } from './checkout-status.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumCheckoutStatusFilter } from './nested-enum-checkout-status-filter.input';

@InputType()
export class NestedEnumCheckoutStatusWithAggregatesFilter {

    @Field(() => CheckoutStatus, {nullable:true})
    equals?: `${CheckoutStatus}`;

    @Field(() => [CheckoutStatus], {nullable:true})
    in?: Array<`${CheckoutStatus}`>;

    @Field(() => [CheckoutStatus], {nullable:true})
    notIn?: Array<`${CheckoutStatus}`>;

    @Field(() => NestedEnumCheckoutStatusWithAggregatesFilter, {nullable:true})
    not?: NestedEnumCheckoutStatusWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumCheckoutStatusFilter, {nullable:true})
    _min?: NestedEnumCheckoutStatusFilter;

    @Field(() => NestedEnumCheckoutStatusFilter, {nullable:true})
    _max?: NestedEnumCheckoutStatusFilter;
}
