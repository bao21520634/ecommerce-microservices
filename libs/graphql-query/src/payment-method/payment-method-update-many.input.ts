import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PaymentMethodWhereInput } from './payment-method-where.input';
import { Type } from 'class-transformer';
import { PaymentMethodUpdateInput } from './payment-method-update.input';

@InputType()
export class PaymentMethodUpdateManyInput {

    @Field(() => PaymentMethodWhereInput, {nullable:false})
    @Type(() => PaymentMethodWhereInput)
    where!: PaymentMethodWhereInput;

    @Field(() => PaymentMethodUpdateInput, {nullable:false})
    @Type(() => PaymentMethodUpdateInput)
    data!: PaymentMethodUpdateInput;
}
