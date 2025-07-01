import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class OrderItemUpdateInput {
    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;

    @Field(() => String, { nullable: false })
    productVariantId!: string;

    @Field(() => String, { nullable: false })
    orderId!: string;

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

    @Field(() => Float, { nullable: true })
    discount?: number;

    @Field(() => Float, { nullable: true })
    tax?: number;

    @Field(() => Float, { nullable: false })
    total!: number;
}
