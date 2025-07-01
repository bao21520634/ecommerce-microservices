import {
    DateTimeFilter,
    FloatFilter,
    IntFilter,
    StringFilter,
    StringNullableFilter,
} from '@ecommerce-microservices/graphql-query';

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemWhereInput {
    @Field(() => [OrderItemWhereInput], { nullable: true })
    AND?: Array<OrderItemWhereInput>;

    @Field(() => [OrderItemWhereInput], { nullable: true })
    OR?: Array<OrderItemWhereInput>;

    @Field(() => [OrderItemWhereInput], { nullable: true })
    NOT?: Array<OrderItemWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    id?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    updatedAt?: DateTimeFilter;

    @Field(() => StringFilter, { nullable: true })
    productVariantId?: StringFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    orderId?: StringNullableFilter;

    @Field(() => StringFilter, { nullable: true })
    displayName?: StringFilter;

    @Field(() => FloatFilter, { nullable: true })
    priceInclTax?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    priceExclTax?: FloatFilter;

    @Field(() => IntFilter, { nullable: true })
    quantity?: IntFilter;

    @Field(() => FloatFilter, { nullable: true })
    subTotal?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    discount?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    tax?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    total?: FloatFilter;
}
