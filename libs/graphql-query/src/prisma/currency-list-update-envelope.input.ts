import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CurrencyCreateInput } from '../currency/currency-create.input';
import { Type } from 'class-transformer';
import { CurrencyUpdateManyInput } from '../currency/currency-update-many.input';
import { CurrencyDeleteManyInput } from './currency-delete-many.input';

@InputType()
export class CurrencyListUpdateEnvelopeInput {

    @Field(() => [CurrencyCreateInput], {nullable:true})
    @Type(() => CurrencyCreateInput)
    set?: Array<CurrencyCreateInput>;

    @Field(() => [CurrencyCreateInput], {nullable:true})
    push?: Array<CurrencyCreateInput>;

    @Field(() => CurrencyUpdateManyInput, {nullable:true})
    @Type(() => CurrencyUpdateManyInput)
    updateMany?: CurrencyUpdateManyInput;

    @Field(() => CurrencyDeleteManyInput, {nullable:true})
    @Type(() => CurrencyDeleteManyInput)
    deleteMany?: CurrencyDeleteManyInput;
}
