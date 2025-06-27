import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CurrencyCreateInput } from '../currency/currency-create.input';
import { Type } from 'class-transformer';

@InputType()
export class CurrencyListCreateEnvelopeInput {

    @Field(() => [CurrencyCreateInput], {nullable:true})
    @Type(() => CurrencyCreateInput)
    set?: Array<CurrencyCreateInput>;
}
