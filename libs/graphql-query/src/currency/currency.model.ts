import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class Currency {

    @Field(() => String, {defaultValue:'United States Dollar',nullable:false})
    name!: string;

    @Field(() => String, {defaultValue:'USD',nullable:false})
    code!: string;

    @Field(() => Float, {defaultValue:1,nullable:false})
    convertRate!: number;

    @Field(() => String, {defaultValue:'$',nullable:false})
    symbol!: string;
}
