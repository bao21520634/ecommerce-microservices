import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutStatus } from './checkout-status.enum';
import { NestedEnumCheckoutStatusFilter } from './nested-enum-checkout-status-filter.input';

@InputType()
export class EnumCheckoutStatusFilter {

    @Field(() => CheckoutStatus, {nullable:true})
    equals?: `${CheckoutStatus}`;

    @Field(() => [CheckoutStatus], {nullable:true})
    in?: Array<`${CheckoutStatus}`>;

    @Field(() => [CheckoutStatus], {nullable:true})
    notIn?: Array<`${CheckoutStatus}`>;

    @Field(() => NestedEnumCheckoutStatusFilter, {nullable:true})
    not?: NestedEnumCheckoutStatusFilter;
}
