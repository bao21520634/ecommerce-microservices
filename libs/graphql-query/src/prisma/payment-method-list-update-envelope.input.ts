import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethodCreateInput } from '../payment-method/payment-method-create.input';
import { Type } from 'class-transformer';
import { PaymentMethodUpdateManyInput } from '../payment-method/payment-method-update-many.input';
import { PaymentMethodDeleteManyInput } from './payment-method-delete-many.input';

@InputType()
export class PaymentMethodListUpdateEnvelopeInput {

    @Field(() => [PaymentMethodCreateInput], {nullable:true})
    @Type(() => PaymentMethodCreateInput)
    set?: Array<PaymentMethodCreateInput>;

    @Field(() => [PaymentMethodCreateInput], {nullable:true})
    push?: Array<PaymentMethodCreateInput>;

    @Field(() => PaymentMethodUpdateManyInput, {nullable:true})
    @Type(() => PaymentMethodUpdateManyInput)
    updateMany?: PaymentMethodUpdateManyInput;

    @Field(() => PaymentMethodDeleteManyInput, {nullable:true})
    @Type(() => PaymentMethodDeleteManyInput)
    deleteMany?: PaymentMethodDeleteManyInput;
}
