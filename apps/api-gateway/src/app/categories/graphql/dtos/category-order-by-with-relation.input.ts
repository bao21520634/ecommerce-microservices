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
    thumbnail?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    backgroundUrl?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    parentId?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    sortOrder?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    metaKeywords?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    limitedToLocations?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    limitedToStores?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    taxCategory?: `${SortOrder}`;

    @Field(() => SortOrder, { nullable: true })
    status?: `${SortOrder}`;
}
