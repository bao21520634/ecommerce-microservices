import {
    OrderStatus,
    PaymentStatus,
    ShippingStatus,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { OrderItem } from '../../../order-items/graphql/entity/order-items.entity';

@ObjectType()
export class Order {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => String, { nullable: false })
    code!: string;

    @Field(() => String, { nullable: false })
    customerId!: string;

    @Field(() => String, { nullable: true })
    addressId!: string | null;

    @Field(() => String, { nullable: true })
    expectedDeliveryDate!: string | null;

    @Field(() => String, { nullable: true })
    paymentMethod!: string | null;

    @Field(() => Float, { nullable: false })
    subTotal!: number;

    @Field(() => Float, { defaultValue: 0, nullable: false })
    discount!: number;

    @Field(() => Float, { defaultValue: 0, nullable: false })
    tax!: number;

    @Field(() => Float, { defaultValue: 0, nullable: false })
    deliveryFee!: number;

    @Field(() => Float, { nullable: false })
    total!: number;

    @Field(() => Boolean, { defaultValue: true, nullable: false })
    isPaid!: boolean;

    @Field(() => Date, { nullable: true })
    paidAt!: Date | null;

    @Field(() => Date, { nullable: true })
    deliveredAt!: Date | null;

    @Field(() => String, { nullable: true })
    note!: string | null;

    @Field(() => OrderStatus, { defaultValue: 'Draft', nullable: false })
    orderStatus!: `${OrderStatus}`;

    @Field(() => PaymentStatus, { defaultValue: 'Pending', nullable: false })
    paymentStatus!: `${PaymentStatus}`;

    @Field(() => ShippingStatus, { nullable: true })
    shippingStatus!: `${ShippingStatus}` | null;

    @Field(() => GraphQLJSON, { nullable: true })
    paymentResult!: any | null;

    @Field(() => [OrderItem], { nullable: true })
    orderItems?: Array<OrderItem>;
}
