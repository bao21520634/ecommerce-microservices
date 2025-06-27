import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CurrencyWhereInput } from '../currency/currency-where.input';
import { Type } from 'class-transformer';

@InputType()
export class CurrencyDeleteManyInput {

    @Field(() => CurrencyWhereInput, {nullable:false})
    @Type(() => CurrencyWhereInput)
    where!: CurrencyWhereInput;
}
