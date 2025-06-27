import {
    OrderStatus,
    PaymentStatus,
    ShippingStatus,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class OrderCreateInput {
    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;

    @Field(() => String, { nullable: false })
    code!: string;

    @Field(() => String, { nullable: false })
    customerId!: string;

    @Field(() => String, { nullable: true })
    addressId?: string;

    @Field(() => String, { nullable: true })
    expectedDeliveryDate?: string;

    @Field(() => String, { nullable: true })
    paymentMethod?: string;

    @Field(() => Float, { nullable: false })
    subTotal!: number;

    @Field(() => Float, { nullable: true })
    discount?: number;

    @Field(() => Float, { nullable: true })
    tax?: number;

    @Field(() => Float, { nullable: true })
    deliveryFee?: number;

    @Field(() => Float, { nullable: false })
    total!: number;

    @Field(() => Boolean, { nullable: true })
    isPaid?: boolean;

    @Field(() => Date, { nullable: true })
    paidAt?: Date;

    @Field(() => Date, { nullable: true })
    deliveredAt?: Date;

    @Field(() => String, { nullable: true })
    note?: string;

    @Field(() => OrderStatus, { nullable: true })
    orderStatus?: `${OrderStatus}`;

    @Field(() => PaymentStatus, { nullable: true })
    paymentStatus?: `${PaymentStatus}`;

    @Field(() => ShippingStatus, { nullable: true })
    shippingStatus?: `${ShippingStatus}`;

    @Field(() => GraphQLJSON, { nullable: true })
    paymentResult?: any;
}
