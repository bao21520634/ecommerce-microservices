import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethod } from './payment-method.enum';

@InputType()
export class NestedEnumPaymentMethodFilter {

    @Field(() => PaymentMethod, {nullable:true})
    equals?: `${PaymentMethod}`;

    @Field(() => [PaymentMethod], {nullable:true})
    in?: Array<`${PaymentMethod}`>;

    @Field(() => [PaymentMethod], {nullable:true})
    notIn?: Array<`${PaymentMethod}`>;

    @Field(() => NestedEnumPaymentMethodFilter, {nullable:true})
    not?: NestedEnumPaymentMethodFilter;
}
