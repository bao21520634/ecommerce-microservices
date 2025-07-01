import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class CommonSettings {

    @Field(() => Int, {defaultValue:9,nullable:false})
    pageSize!: number;

    @Field(() => Boolean, {defaultValue:false,nullable:false})
    isMaintenanceMode!: boolean;

    @Field(() => Float, {defaultValue:0,nullable:false})
    freeShippingMinPrice!: number;

    @Field(() => String, {defaultValue:'light',nullable:false})
    defaultTheme!: string;

    @Field(() => String, {defaultValue:'gold',nullable:false})
    defaultColor!: string;
}
