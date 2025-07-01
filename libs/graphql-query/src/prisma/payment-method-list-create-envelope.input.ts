import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethodCreateInput } from '../payment-method/payment-method-create.input';
import { Type } from 'class-transformer';

@InputType()
export class PaymentMethodListCreateEnvelopeInput {

    @Field(() => [PaymentMethodCreateInput], {nullable:true})
    @Type(() => PaymentMethodCreateInput)
    set?: Array<PaymentMethodCreateInput>;
}
