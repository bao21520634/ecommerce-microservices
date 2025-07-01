import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class PaymentMethodObjectEqualityInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Float, {nullable:false})
    commission!: number;
}
