import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CurrencyObjectEqualityInput } from './currency-object-equality.input';
import { CurrencyWhereInput } from '../currency/currency-where.input';

@InputType()
export class CurrencyCompositeListFilter {

    @Field(() => [CurrencyObjectEqualityInput], {nullable:true})
    equals?: Array<CurrencyObjectEqualityInput>;

    @Field(() => CurrencyWhereInput, {nullable:true})
    every?: CurrencyWhereInput;

    @Field(() => CurrencyWhereInput, {nullable:true})
    some?: CurrencyWhereInput;

    @Field(() => CurrencyWhereInput, {nullable:true})
    none?: CurrencyWhereInput;

    @Field(() => Boolean, {nullable:true})
    isEmpty?: boolean;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
