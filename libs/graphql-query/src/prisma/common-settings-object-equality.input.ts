import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class CommonSettingsObjectEqualityInput {

    @Field(() => Int, {nullable:false})
    pageSize!: number;

    @Field(() => Boolean, {nullable:false})
    isMaintenanceMode!: boolean;

    @Field(() => Float, {nullable:false})
    freeShippingMinPrice!: number;

    @Field(() => String, {nullable:false})
    defaultTheme!: string;

    @Field(() => String, {nullable:false})
    defaultColor!: string;
}
