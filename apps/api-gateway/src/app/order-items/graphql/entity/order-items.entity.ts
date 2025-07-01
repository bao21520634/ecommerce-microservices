import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Order } from '../../../orders/graphql/entity/orders.entity';

@ObjectType()
export class OrderItem {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => String, { nullable: false })
    productVariantId!: string;

    @Field(() => String, { nullable: false })
    orderId!: string | null;

    @Field(() => String, { nullable: false })
    displayName!: string;

    @Field(() => Float, { nullable: false })
    priceInclTax!: number;

    @Field(() => Float, { nullable: false })
    priceExclTax!: number;

    @Field(() => Int, { nullable: false })
    quantity!: number;

    @Field(() => Float, { nullable: false })
    subTotal!: number;

    @Field(() => Float, { defaultValue: 0, nullable: false })
    discount!: number;

    @Field(() => Float, { defaultValue: 0, nullable: false })
    tax!: number;

    @Field(() => Float, { nullable: false })
    total!: number;

    @Field(() => Order, { nullable: true })
    order?: Order | null;
}
