import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommonSettingsObjectEqualityInput } from './common-settings-object-equality.input';
import { CommonSettingsWhereInput } from '../common-settings/common-settings-where.input';

@InputType()
export class CommonSettingsCompositeFilter {

    @Field(() => CommonSettingsObjectEqualityInput, {nullable:true})
    equals?: CommonSettingsObjectEqualityInput;

    @Field(() => CommonSettingsWhereInput, {nullable:true})
    is?: CommonSettingsWhereInput;

    @Field(() => CommonSettingsWhereInput, {nullable:true})
    isNot?: CommonSettingsWhereInput;
}
