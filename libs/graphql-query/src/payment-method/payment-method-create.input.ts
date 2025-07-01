import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class PaymentMethodCreateInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => Float, {nullable:true})
    commission?: number;
}
