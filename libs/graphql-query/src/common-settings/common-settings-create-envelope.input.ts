import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommonSettingsCreateInput } from './common-settings-create.input';
import { Type } from 'class-transformer';

@InputType()
export class CommonSettingsCreateEnvelopeInput {

    @Field(() => CommonSettingsCreateInput, {nullable:true})
    @Type(() => CommonSettingsCreateInput)
    set?: CommonSettingsCreateInput;
}
