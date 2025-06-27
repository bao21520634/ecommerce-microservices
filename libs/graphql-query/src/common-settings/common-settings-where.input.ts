import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class CommonSettingsWhereInput {

    @Field(() => [CommonSettingsWhereInput], {nullable:true})
    AND?: Array<CommonSettingsWhereInput>;

    @Field(() => [CommonSettingsWhereInput], {nullable:true})
    OR?: Array<CommonSettingsWhereInput>;

    @Field(() => [CommonSettingsWhereInput], {nullable:true})
    NOT?: Array<CommonSettingsWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    pageSize?: IntFilter;

    @Field(() => BoolFilter, {nullable:true})
    isMaintenanceMode?: BoolFilter;

    @Field(() => FloatFilter, {nullable:true})
    freeShippingMinPrice?: FloatFilter;

    @Field(() => StringFilter, {nullable:true})
    defaultTheme?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    defaultColor?: StringFilter;
}
