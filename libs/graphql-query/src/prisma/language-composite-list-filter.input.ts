import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LanguageObjectEqualityInput } from './language-object-equality.input';
import { LanguageWhereInput } from '../language/language-where.input';

@InputType()
export class LanguageCompositeListFilter {

    @Field(() => [LanguageObjectEqualityInput], {nullable:true})
    equals?: Array<LanguageObjectEqualityInput>;

    @Field(() => LanguageWhereInput, {nullable:true})
    every?: LanguageWhereInput;

    @Field(() => LanguageWhereInput, {nullable:true})
    some?: LanguageWhereInput;

    @Field(() => LanguageWhereInput, {nullable:true})
    none?: LanguageWhereInput;

    @Field(() => Boolean, {nullable:true})
    isEmpty?: boolean;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
