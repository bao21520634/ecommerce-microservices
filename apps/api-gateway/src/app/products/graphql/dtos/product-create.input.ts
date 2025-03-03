import {
    ProductStatus,
    ProductType,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class ProductCreateInput {
    @Field(() => Date, { nullable: true })
    createdAt?: Date | string;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date | string;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: false })
    slug!: string;

    @Field(() => String, { nullable: true })
    shortDescription?: string;

    @Field(() => String, { nullable: true })
    longDescription?: string;

    @Field(() => String, { nullable: true })
    thumbnailUrl?: string;

    @Field(() => ProductType, { nullable: true })
    productType?: `${ProductType}`;

    @Field(() => String, { nullable: true })
    productTemplateId?: string;

    @Field(() => String, { nullable: true })
    manufacturerId?: string;

    @Field(() => Int, { nullable: true })
    sortOrder?: number;

    @Field(() => String, { nullable: true })
    metaTitle?: string;

    @Field(() => String, { nullable: true })
    metaDescription?: string;

    @Field(() => String, { nullable: true })
    metaKeywords?: string;

    @Field(() => String, { nullable: true })
    tags?: string;

    @Field(() => Boolean, { nullable: true })
    allowCustomMetaTag?: boolean;

    @Field(() => Boolean, { nullable: true })
    limitedToLocations?: boolean;

    @Field(() => Boolean, { nullable: true })
    limitedToStores?: boolean;

    @Field(() => ProductStatus, { nullable: true })
    status?: `${ProductStatus}`;

    @Field(() => Boolean, { nullable: true })
    displayPrice?: boolean;

    @Field(() => Boolean, { nullable: true })
    shippable?: boolean;

    @Field(() => Float, { nullable: true })
    weight?: number;

    @Field(() => Float, { nullable: true })
    length?: number;

    @Field(() => Float, { nullable: true })
    width?: number;

    @Field(() => Float, { nullable: true })
    height?: number;

    @Field(() => String, { nullable: true })
    taxCategory?: string;

    @Field(() => Float, { nullable: true })
    taxPercent?: number;

    @Field(() => Float, { nullable: false })
    priceExclTax!: number;

    @Field(() => Float, { nullable: false })
    priceInclTax!: number;

    @Field(() => String, { nullable: true })
    unit?: string;

    @Field(() => Int, { nullable: true })
    stockAvailability?: number;

    @Field(() => GraphQLJSON, { nullable: true })
    attributes?: any;

    @Field(() => GraphQLJSON, { nullable: true })
    variantAttributes?: any;
}
