import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class CurrencyCreateInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    code?: string;

    @Field(() => Float, {nullable:true})
    convertRate?: number;

    @Field(() => String, {nullable:true})
    symbol?: string;
}
