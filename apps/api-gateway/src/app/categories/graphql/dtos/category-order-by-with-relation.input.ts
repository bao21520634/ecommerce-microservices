import { SortOrder } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CategoryOrderByWithRelationInput {
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
    shortDescription?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    longDescription?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    thumbnailUrl?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    backgroundUrl?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    templateId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    parentId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    sortOrder?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    metaTitle?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    metaDescription?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    metaKeywords?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    allowCustomMetaTag?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    limitedToLocations?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    limitedToStores?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    taxCategory?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    pageSize?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    allowCustomersToSelectPageSize?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceRangeFiltering?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    manuallyPriceRange?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceFrom?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    priceTo?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    status?: `${SortOrder}`;
}
