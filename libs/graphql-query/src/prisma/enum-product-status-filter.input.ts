import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProductStatus } from './product-status.enum';
import { NestedEnumProductStatusFilter } from './nested-enum-product-status-filter.input';

@InputType()
export class EnumProductStatusFilter {

    @Field(() => ProductStatus, {nullable:true})
    equals?: `${ProductStatus}`;

    @Field(() => [ProductStatus], {nullable:true})
    in?: Array<`${ProductStatus}`>;

    @Field(() => [ProductStatus], {nullable:true})
    notIn?: Array<`${ProductStatus}`>;

    @Field(() => NestedEnumProductStatusFilter, {nullable:true})
    not?: NestedEnumProductStatusFilter;
}
