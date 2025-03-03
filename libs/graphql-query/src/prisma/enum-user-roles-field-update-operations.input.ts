import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserRoles } from './user-roles.enum';

@InputType()
export class EnumUserRolesFieldUpdateOperationsInput {

    @Field(() => UserRoles, {nullable:true})
    set?: `${UserRoles}`;
}
