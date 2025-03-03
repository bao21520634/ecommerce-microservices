import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChargeStatus } from './charge-status.enum';
import { NestedEnumChargeStatusFilter } from './nested-enum-charge-status-filter.input';

@InputType()
export class EnumChargeStatusFilter {

    @Field(() => ChargeStatus, {nullable:true})
    equals?: `${ChargeStatus}`;

    @Field(() => [ChargeStatus], {nullable:true})
    in?: Array<`${ChargeStatus}`>;

    @Field(() => [ChargeStatus], {nullable:true})
    notIn?: Array<`${ChargeStatus}`>;

    @Field(() => NestedEnumChargeStatusFilter, {nullable:true})
    not?: NestedEnumChargeStatusFilter;
}
