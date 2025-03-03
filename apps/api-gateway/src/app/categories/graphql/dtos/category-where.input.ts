import {
    BoolFilter,
    DateTimeFilter,
    EnumCategoryStatusFilter,
    FloatNullableFilter,
    IntFilter,
    IntNullableFilter,
    IntNullableListFilter,
    StringFilter,
    StringNullableFilter,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class CategoryWhereInput {
    @Field(() => [CategoryWhereInput], { nullable: true })
    AND?: Array<CategoryWhereInput>;

    @Field(() => [CategoryWhereInput], { nullable: true })
    OR?: Array<CategoryWhereInput>;

    @Field(() => [CategoryWhereInput], { nullable: true })
    NOT?: Array<CategoryWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    id?: StringFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    updatedAt?: DateTimeFilter;

    @Field(() => StringFilter, { nullable: true })
    name?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    slug?: StringFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    shortDescription?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    longDescription?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    thumbnailUrl?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    backgroundUrl?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    templateId?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    parentId?: StringNullableFilter;

    @Field(() => IntFilter, { nullable: true })
    sortOrder?: IntFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    metaTitle?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    metaDescription?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    metaKeywords?: StringNullableFilter;

    @Field(() => BoolFilter, { nullable: true })
    allowCustomMetaTag?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    limitedToLocations?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    limitedToStores?: BoolFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    taxCategory?: StringNullableFilter;

    @Field(() => IntNullableFilter, { nullable: true })
    pageSize?: IntNullableFilter;

    @Field(() => IntNullableListFilter, { nullable: true })
    pageSizeOption?: IntNullableListFilter;

    @Field(() => BoolFilter, { nullable: true })
    allowCustomersToSelectPageSize?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    priceRangeFiltering?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    manuallyPriceRange?: BoolFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    priceFrom?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    priceTo?: FloatNullableFilter;

    @Field(() => EnumCategoryStatusFilter, { nullable: true })
    status?: EnumCategoryStatusFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    parent?: StringNullableFilter;
}
