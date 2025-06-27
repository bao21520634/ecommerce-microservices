import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SiteSettingsCreateInput } from './site-settings-create.input';
import { Type } from 'class-transformer';
import { SiteSettingsUpdateInput } from './site-settings-update.input';

@InputType()
export class SiteSettingsUpdateEnvelopeInput {

    @Field(() => SiteSettingsCreateInput, {nullable:true})
    @Type(() => SiteSettingsCreateInput)
    set?: SiteSettingsCreateInput;

    @Field(() => SiteSettingsUpdateInput, {nullable:true})
    @Type(() => SiteSettingsUpdateInput)
    update?: SiteSettingsUpdateInput;
}
