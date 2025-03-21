import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { NestedIntNullableFilter } from './nested-int-nullable-filter.input';
import { NestedJsonNullableFilter } from './nested-json-nullable-filter.input';

@InputType()
export class JsonNullableWithAggregatesFilter {

    @Field(() => GraphQLJSON, {nullable:true})
    equals?: any;

    @Field(() => GraphQLJSON, {nullable:true})
    not?: any;

    @Field(() => NestedIntNullableFilter, {nullable:true})
    _count?: NestedIntNullableFilter;

    @Field(() => NestedJsonNullableFilter, {nullable:true})
    _min?: NestedJsonNullableFilter;

    @Field(() => NestedJsonNullableFilter, {nullable:true})
    _max?: NestedJsonNullableFilter;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
