import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethodWhereInput } from '../payment-method/payment-method-where.input';
import { Type } from 'class-transformer';

@InputType()
export class PaymentMethodDeleteManyInput {

    @Field(() => PaymentMethodWhereInput, {nullable:false})
    @Type(() => PaymentMethodWhereInput)
    where!: PaymentMethodWhereInput;
}
