import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommonSettingsCreateInput } from './common-settings-create.input';
import { Type } from 'class-transformer';
import { CommonSettingsUpdateInput } from './common-settings-update.input';

@InputType()
export class CommonSettingsUpdateEnvelopeInput {

    @Field(() => CommonSettingsCreateInput, {nullable:true})
    @Type(() => CommonSettingsCreateInput)
    set?: CommonSettingsCreateInput;

    @Field(() => CommonSettingsUpdateInput, {nullable:true})
    @Type(() => CommonSettingsUpdateInput)
    update?: CommonSettingsUpdateInput;
}
