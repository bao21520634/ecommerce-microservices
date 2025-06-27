import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Language {

    @Field(() => String, {defaultValue:'English',nullable:false})
    name!: string;

    @Field(() => String, {defaultValue:'en-US',nullable:false})
    code!: string;
}
