import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class SiteSettingsWhereInput {

    @Field(() => [SiteSettingsWhereInput], {nullable:true})
    AND?: Array<SiteSettingsWhereInput>;

    @Field(() => [SiteSettingsWhereInput], {nullable:true})
    OR?: Array<SiteSettingsWhereInput>;

    @Field(() => [SiteSettingsWhereInput], {nullable:true})
    NOT?: Array<SiteSettingsWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    url?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    logo?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    slogan?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    description?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    keywords?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    email?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    phone?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    author?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    copyright?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    address?: StringFilter;
}
