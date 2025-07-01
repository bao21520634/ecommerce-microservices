import { SortOrder } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProductOrderByWithRelationInput {
    @Field(() => SortOrder, { nullable: true })
    id?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    createdAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    updatedAt?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    name?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    slug?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    brand?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    shortDescription?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    longDescription?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    thumbnail?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    images?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    productType?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    manufacturerId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    sortOrder?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    metaKeywords?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    tags?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    limitedToLocations?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    limitedToStores?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    status?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    displayPrice?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    shippable?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    weight?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    length?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    width?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    height?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    taxCategory?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    taxPercent?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceExclTax?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceInclTax?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    unit?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    stockAvailability?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    attributes?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    variantAttributes?: `${SortOrder}`;
}
