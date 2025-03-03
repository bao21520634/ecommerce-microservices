import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChargeStatus } from './charge-status.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumChargeStatusFilter } from './nested-enum-charge-status-filter.input';

@InputType()
export class NestedEnumChargeStatusWithAggregatesFilter {

    @Field(() => ChargeStatus, {nullable:true})
    equals?: `${ChargeStatus}`;

    @Field(() => [ChargeStatus], {nullable:true})
    in?: Array<`${ChargeStatus}`>;

    @Field(() => [ChargeStatus], {nullable:true})
    notIn?: Array<`${ChargeStatus}`>;

    @Field(() => NestedEnumChargeStatusWithAggregatesFilter, {nullable:true})
    not?: NestedEnumChargeStatusWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumChargeStatusFilter, {nullable:true})
    _min?: NestedEnumChargeStatusFilter;

    @Field(() => NestedEnumChargeStatusFilter, {nullable:true})
    _max?: NestedEnumChargeStatusFilter;
}
