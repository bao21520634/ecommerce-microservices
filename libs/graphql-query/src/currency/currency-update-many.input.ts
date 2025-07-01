import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CurrencyWhereInput } from './currency-where.input';
import { Type } from 'class-transformer';
import { CurrencyUpdateInput } from './currency-update.input';

@InputType()
export class CurrencyUpdateManyInput {

    @Field(() => CurrencyWhereInput, {nullable:false})
    @Type(() => CurrencyWhereInput)
    where!: CurrencyWhereInput;

    @Field(() => CurrencyUpdateInput, {nullable:false})
    @Type(() => CurrencyUpdateInput)
    data!: CurrencyUpdateInput;
}
