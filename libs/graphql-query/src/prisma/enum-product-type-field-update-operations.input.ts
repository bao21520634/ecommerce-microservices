import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductType } from './product-type.enum';

@InputType()
export class EnumProductTypeFieldUpdateOperationsInput {

    @Field(() => ProductType, {nullable:true})
    set?: `${ProductType}`;
}
