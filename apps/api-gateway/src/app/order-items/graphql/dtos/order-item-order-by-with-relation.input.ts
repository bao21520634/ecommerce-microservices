import { SortOrder } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderItemOrderByWithRelationInput {
    @Field(() => SortOrder, { nullable: true })
    id?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    updatedAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    productVariantId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    orderId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    displayName?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceInclTax?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceExclTax?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    quantity?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    subTotal?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    discount?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    tax?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    total?: `${SortOrder}`;
}
