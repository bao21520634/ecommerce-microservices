import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LanguageCreateInput } from '../language/language-create.input';
import { Type } from 'class-transformer';
import { LanguageUpdateManyInput } from '../language/language-update-many.input';
import { LanguageDeleteManyInput } from './language-delete-many.input';

@InputType()
export class LanguageListUpdateEnvelopeInput {

    @Field(() => [LanguageCreateInput], {nullable:true})
    @Type(() => LanguageCreateInput)
    set?: Array<LanguageCreateInput>;

    @Field(() => [LanguageCreateInput], {nullable:true})
    push?: Array<LanguageCreateInput>;

    @Field(() => LanguageUpdateManyInput, {nullable:true})
    @Type(() => LanguageUpdateManyInput)
    updateMany?: LanguageUpdateManyInput;

    @Field(() => LanguageDeleteManyInput, {nullable:true})
    @Type(() => LanguageDeleteManyInput)
    deleteMany?: LanguageDeleteManyInput;
}
