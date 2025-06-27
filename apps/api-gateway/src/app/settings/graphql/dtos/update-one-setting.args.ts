import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SettingUpdateInput } from './setting-update.input';
import { Type } from 'class-transformer';

@ArgsType()
export class UpdateOneSettingArgs {
    @Field(() => SettingUpdateInput, { nullable: false })
    @Type(() => SettingUpdateInput)
    data!: SettingUpdateInput;

    @Field(() => String, { nullable: false })
    @Type(() => String)
    id!: string;
}
