import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LanguageCreateInput } from '../language/language-create.input';
import { Type } from 'class-transformer';

@InputType()
export class LanguageListCreateEnvelopeInput {

    @Field(() => [LanguageCreateInput], {nullable:true})
    @Type(() => LanguageCreateInput)
    set?: Array<LanguageCreateInput>;
}
