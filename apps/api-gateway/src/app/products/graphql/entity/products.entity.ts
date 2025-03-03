import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ProductCategory } from '../../../product-categories/graphql/entity/product-categories.entity';
import {
    ProductStatus,
    ProductType,
} from '@ecommerce-microservices/graphql-query';

@ObjectType()
export class Product {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: false })
    slug!: string;

    @Field(() => String, { nullable: true })
    shortDescription!: string | null;

    @Field(() => String, { nullable: true })
    longDescription!: string | null;

    @Field(() => String, { nullable: true })
    thumbnailUrl!: string | null;

    @Field(() => ProductType, { defaultValue: 'Simple', nullable: false })
    productType!: `${ProductType}`;

    @Field(() => String, { nullable: true })
    productTemplateId!: string | null;

    @Field(() => String, { nullable: true })
    manufacturerId!: string | null;

    @Field(() => Int, { defaultValue: 0, nullable: false })
    sortOrder!: number;

    @Field(() => String, { nullable: true })
    metaTitle!: string | null;

    @Field(() => String, { nullable: true })
    metaDescription!: string | null;

    @Field(() => String, { nullable: true })
    metaKeywords!: string | null;

    @Field(() => String, { nullable: true })
    tags!: string | null;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    allowCustomMetaTag!: boolean;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    limitedToLocations!: boolean;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    limitedToStores!: boolean;

    @Field(() => ProductStatus, { defaultValue: 'Active', nullable: false })
    status!: `${ProductStatus}`;

    @Field(() => Boolean, { defaultValue: true, nullable: false })
    displayPrice!: boolean;

    @Field(() => Boolean, { defaultValue: true, nullable: false })
    shippable!: boolean;

    @Field(() => Float, { nullable: true })
    weight!: number | null;

    @Field(() => Float, { nullable: true })
    length!: number | null;

    @Field(() => Float, { nullable: true })
    width!: number | null;

    @Field(() => Float, { nullable: true })
    height!: number | null;

    @Field(() => String, { nullable: true })
    taxCategory!: string | null;

    @Field(() => Float, { nullable: true })
    taxPercent!: number | null;

    @Field(() => Float, { nullable: false })
    priceExclTax!: number;

    @Field(() => Float, { nullable: false })
    priceInclTax!: number;

    @Field(() => String, { nullable: true })
    unit!: string | null;

    @Field(() => Int, { nullable: true })
    stockAvailability!: number | null;

    @Field(() => GraphQLJSON, { nullable: true })
    attributes!: any | null;

    @Field(() => GraphQLJSON, { nullable: true })
    variantAttributes!: any | null;

    @Field(() => [ProductCategory], { nullable: true })
    categories?: Array<ProductCategory>;
}
