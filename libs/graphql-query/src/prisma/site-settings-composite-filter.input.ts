import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SiteSettingsObjectEqualityInput } from './site-settings-object-equality.input';
import { SiteSettingsWhereInput } from '../site-settings/site-settings-where.input';

@InputType()
export class SiteSettingsCompositeFilter {

    @Field(() => SiteSettingsObjectEqualityInput, {nullable:true})
    equals?: SiteSettingsObjectEqualityInput;

    @Field(() => SiteSettingsWhereInput, {nullable:true})
    is?: SiteSettingsWhereInput;

    @Field(() => SiteSettingsWhereInput, {nullable:true})
    isNot?: SiteSettingsWhereInput;
}
