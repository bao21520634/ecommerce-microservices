import { CategoryStatus } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class CategoryCreateInput {
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

    @Field(() => String, { nullable: true })
    backgroundUrl?: string;

    @Field(() => String, { nullable: true })
    templateId?: string;

    @Field(() => Int, { nullable: true })
    sortOrder?: number;

    @Field(() => String, { nullable: true })
    metaTitle?: string;

    @Field(() => String, { nullable: true })
    metaDescription?: string;

    @Field(() => String, { nullable: true })
    metaKeywords?: string;

    @Field(() => Boolean, { nullable: true })
    allowCustomMetaTag?: boolean;

    @Field(() => Boolean, { nullable: true })
    limitedToLocations?: boolean;

    @Field(() => Boolean, { nullable: true })
    limitedToStores?: boolean;

    @Field(() => String, { nullable: true })
    taxCategory?: string;

    @Field(() => Int, { nullable: true })
    pageSize?: number;

    @Field(() => Boolean, { nullable: true })
    allowCustomersToSelectPageSize?: boolean;

    @Field(() => Boolean, { nullable: true })
    priceRangeFiltering?: boolean;

    @Field(() => Boolean, { nullable: true })
    manuallyPriceRange?: boolean;

    @Field(() => Float, { nullable: true })
    priceFrom?: number;

    @Field(() => Float, { nullable: true })
    priceTo?: number;

    @Field(() => CategoryStatus, { nullable: true })
    status?: `${CategoryStatus}`;

    @Field(() => String, { nullable: true })
    parentId?: string;
}
