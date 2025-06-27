import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LanguageWhereInput } from '../language/language-where.input';
import { Type } from 'class-transformer';

@InputType()
export class LanguageDeleteManyInput {

    @Field(() => LanguageWhereInput, {nullable:false})
    @Type(() => LanguageWhereInput)
    where!: LanguageWhereInput;
}
