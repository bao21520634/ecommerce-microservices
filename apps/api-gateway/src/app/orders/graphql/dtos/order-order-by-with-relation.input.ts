import { SortOrder } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderOrderByWithRelationInput {
    @Field(() => SortOrder, { nullable: true })
    id?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    updatedAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    code?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    customerId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    addressId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    expectedDeliveryDate?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    paymentMethod?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    subTotal?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    discount?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    tax?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    deliveryFee?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    total?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    isPaid?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    paidAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    deliveredAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    note?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    orderStatus?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    paymentStatus?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    shippingStatus?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    paymentResult?: `${SortOrder}`;
}
