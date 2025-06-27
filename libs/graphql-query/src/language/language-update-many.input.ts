import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LanguageWhereInput } from './language-where.input';
import { Type } from 'class-transformer';
import { LanguageUpdateInput } from './language-update.input';

@InputType()
export class LanguageUpdateManyInput {

    @Field(() => LanguageWhereInput, {nullable:false})
    @Type(() => LanguageWhereInput)
    where!: LanguageWhereInput;

    @Field(() => LanguageUpdateInput, {nullable:false})
    @Type(() => LanguageUpdateInput)
    data!: LanguageUpdateInput;
}
