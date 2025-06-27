import {
    BoolFilter,
    DateTimeFilter,
    DateTimeNullableFilter,
    EnumOrderStatusFilter,
    EnumPaymentStatusFilter,
    EnumShippingStatusNullableFilter,
    FloatFilter,
    JsonNullableFilter,
    StringFilter,
    StringNullableFilter,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderWhereInput {
    @Field(() => [OrderWhereInput], { nullable: true })
    AND?: Array<OrderWhereInput>;

    @Field(() => [OrderWhereInput], { nullable: true })
    OR?: Array<OrderWhereInput>;

    @Field(() => [OrderWhereInput], { nullable: true })
    NOT?: Array<OrderWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    id?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    updatedAt?: DateTimeFilter;

    @Field(() => StringFilter, { nullable: true })
    code?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    customerId?: StringFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    addressId?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    expectedDeliveryDate?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    paymentMethod?: StringNullableFilter;

    @Field(() => FloatFilter, { nullable: true })
    subTotal?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    discount?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    tax?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    deliveryFee?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    total?: FloatFilter;

    @Field(() => BoolFilter, { nullable: true })
    isPaid?: BoolFilter;

    @Field(() => DateTimeNullableFilter, { nullable: true })
    paidAt?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, { nullable: true })
    deliveredAt?: DateTimeNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    note?: StringNullableFilter;

    @Field(() => EnumOrderStatusFilter, { nullable: true })
    orderStatus?: EnumOrderStatusFilter;

    @Field(() => EnumPaymentStatusFilter, { nullable: true })
    paymentStatus?: EnumPaymentStatusFilter;

    @Field(() => EnumShippingStatusNullableFilter, { nullable: true })
    shippingStatus?: EnumShippingStatusNullableFilter;

    @Field(() => JsonNullableFilter, { nullable: true })
    paymentResult?: JsonNullableFilter;
}
