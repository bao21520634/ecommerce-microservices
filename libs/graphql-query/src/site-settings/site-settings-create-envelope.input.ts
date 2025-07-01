import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SiteSettingsCreateInput } from './site-settings-create.input';
import { Type } from 'class-transformer';

@InputType()
export class SiteSettingsCreateEnvelopeInput {

    @Field(() => SiteSettingsCreateInput, {nullable:true})
    @Type(() => SiteSettingsCreateInput)
    set?: SiteSettingsCreateInput;
}
