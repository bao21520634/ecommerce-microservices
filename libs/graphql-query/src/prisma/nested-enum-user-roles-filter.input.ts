import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRoles } from './user-roles.enum';

@InputType()
export class NestedEnumUserRolesFilter {

    @Field(() => UserRoles, {nullable:true})
    equals?: `${UserRoles}`;

    @Field(() => [UserRoles], {nullable:true})
    in?: Array<`${UserRoles}`>;

    @Field(() => [UserRoles], {nullable:true})
    notIn?: Array<`${UserRoles}`>;

    @Field(() => NestedEnumUserRolesFilter, {nullable:true})
    not?: NestedEnumUserRolesFilter;
}
