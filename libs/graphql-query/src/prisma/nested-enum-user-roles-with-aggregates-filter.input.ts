import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRoles } from './user-roles.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumUserRolesFilter } from './nested-enum-user-roles-filter.input';

@InputType()
export class NestedEnumUserRolesWithAggregatesFilter {

    @Field(() => UserRoles, {nullable:true})
    equals?: `${UserRoles}`;

    @Field(() => [UserRoles], {nullable:true})
    in?: Array<`${UserRoles}`>;

    @Field(() => [UserRoles], {nullable:true})
    notIn?: Array<`${UserRoles}`>;

    @Field(() => NestedEnumUserRolesWithAggregatesFilter, {nullable:true})
    not?: NestedEnumUserRolesWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumUserRolesFilter, {nullable:true})
    _min?: NestedEnumUserRolesFilter;

    @Field(() => NestedEnumUserRolesFilter, {nullable:true})
    _max?: NestedEnumUserRolesFilter;
}
