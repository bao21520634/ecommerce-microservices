import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryStatus } from './category-status.enum';

@InputType()
export class NestedEnumCategoryStatusFilter {

    @Field(() => CategoryStatus, {nullable:true})
    equals?: `${CategoryStatus}`;

    @Field(() => [CategoryStatus], {nullable:true})
    in?: Array<`${CategoryStatus}`>;

    @Field(() => [CategoryStatus], {nullable:true})
    notIn?: Array<`${CategoryStatus}`>;

    @Field(() => NestedEnumCategoryStatusFilter, {nullable:true})
    not?: NestedEnumCategoryStatusFilter;
}
