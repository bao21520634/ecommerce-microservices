import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class CommonSettingsCreateInput {

    @Field(() => Int, {nullable:true})
    pageSize?: number;

    @Field(() => Boolean, {nullable:true})
    isMaintenanceMode?: boolean;

    @Field(() => Float, {nullable:true})
    freeShippingMinPrice?: number;

    @Field(() => String, {nullable:true})
    defaultTheme?: string;

    @Field(() => String, {nullable:true})
    defaultColor?: string;
}
