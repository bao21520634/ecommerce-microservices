import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethod {

    @Field(() => String, {defaultValue:'PayPal',nullable:false})
    name!: string;

    @Field(() => Float, {defaultValue:0,nullable:false})
    commission!: number;
}
