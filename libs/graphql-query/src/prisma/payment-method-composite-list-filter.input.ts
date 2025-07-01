import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethodObjectEqualityInput } from './payment-method-object-equality.input';
import { PaymentMethodWhereInput } from '../payment-method/payment-method-where.input';

@InputType()
export class PaymentMethodCompositeListFilter {

    @Field(() => [PaymentMethodObjectEqualityInput], {nullable:true})
    equals?: Array<PaymentMethodObjectEqualityInput>;

    @Field(() => PaymentMethodWhereInput, {nullable:true})
    every?: PaymentMethodWhereInput;

    @Field(() => PaymentMethodWhereInput, {nullable:true})
    some?: PaymentMethodWhereInput;

    @Field(() => PaymentMethodWhereInput, {nullable:true})
    none?: PaymentMethodWhereInput;

    @Field(() => Boolean, {nullable:true})
    isEmpty?: boolean;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
