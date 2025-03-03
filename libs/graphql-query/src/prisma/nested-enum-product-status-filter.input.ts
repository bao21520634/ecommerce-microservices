import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductStatus } from './product-status.enum';

@InputType()
export class NestedEnumProductStatusFilter {

    @Field(() => ProductStatus, {nullable:true})
    equals?: `${ProductStatus}`;

    @Field(() => [ProductStatus], {nullable:true})
    in?: Array<`${ProductStatus}`>;

    @Field(() => [ProductStatus], {nullable:true})
    notIn?: Array<`${ProductStatus}`>;

    @Field(() => NestedEnumProductStatusFilter, {nullable:true})
    not?: NestedEnumProductStatusFilter;
}
