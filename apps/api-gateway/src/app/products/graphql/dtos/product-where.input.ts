import {
    BoolFilter,
    DateTimeFilter,
    EnumProductStatusFilter,
    EnumProductTypeFilter,
    FloatFilter,
    FloatNullableFilter,
    IntFilter,
    IntNullableFilter,
    JsonNullableFilter,
    StringFilter,
    StringNullableFilter,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProductWhereInput {
    @Field(() => [ProductWhereInput], { nullable: true })
    AND?: Array<ProductWhereInput>;

    @Field(() => [ProductWhereInput], { nullable: true })
    OR?: Array<ProductWhereInput>;

    @Field(() => [ProductWhereInput], { nullable: true })
    NOT?: Array<ProductWhereInput>;

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

    @Field(() => EnumProductTypeFilter, { nullable: true })
    productType?: EnumProductTypeFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    productTemplateId?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    manufacturerId?: StringNullableFilter;

    @Field(() => IntFilter, { nullable: true })
    sortOrder?: IntFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    metaTitle?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    metaDescription?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    metaKeywords?: StringNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    tags?: StringNullableFilter;

    @Field(() => BoolFilter, { nullable: true })
    allowCustomMetaTag?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    limitedToLocations?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    limitedToStores?: BoolFilter;

    @Field(() => EnumProductStatusFilter, { nullable: true })
    status?: EnumProductStatusFilter;

    @Field(() => BoolFilter, { nullable: true })
    displayPrice?: BoolFilter;

    @Field(() => BoolFilter, { nullable: true })
    shippable?: BoolFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    weight?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    length?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    width?: FloatNullableFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    height?: FloatNullableFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    taxCategory?: StringNullableFilter;

    @Field(() => FloatNullableFilter, { nullable: true })
    taxPercent?: FloatNullableFilter;

    @Field(() => FloatFilter, { nullable: true })
    priceExclTax?: FloatFilter;

    @Field(() => FloatFilter, { nullable: true })
    priceInclTax?: FloatFilter;

    @Field(() => StringNullableFilter, { nullable: true })
    unit?: StringNullableFilter;

    @Field(() => IntNullableFilter, { nullable: true })
    stockAvailability?: IntNullableFilter;

    @Field(() => JsonNullableFilter, { nullable: true })
    attributes?: JsonNullableFilter;

    @Field(() => JsonNullableFilter, { nullable: true })
    variantAttributes?: JsonNullableFilter;
}
