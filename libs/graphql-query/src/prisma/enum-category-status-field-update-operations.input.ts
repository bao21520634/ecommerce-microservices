import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CategoryStatus } from './category-status.enum';

@InputType()
export class EnumCategoryStatusFieldUpdateOperationsInput {

    @Field(() => CategoryStatus, {nullable:true})
    set?: `${CategoryStatus}`;
}
