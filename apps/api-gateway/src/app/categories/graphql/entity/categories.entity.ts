import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { ProductCategory } from '../../../product-categories/graphql/entity/product-categories.entity';
import { CategoryStatus } from '@ecommerce-microservices/graphql-query';

@ObjectType()
export class Category {
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

    @Field(() => String, { nullable: true })
    backgroundUrl!: string | null;

    @Field(() => String, { nullable: true })
    templateId!: string | null;

    @Field(() => String, { nullable: true })
    parentId!: string | null;

    @Field(() => Int, { defaultValue: 0, nullable: false })
    sortOrder!: number;

    @Field(() => String, { nullable: true })
    metaTitle!: string | null;

    @Field(() => String, { nullable: true })
    metaDescription!: string | null;

    @Field(() => String, { nullable: true })
    metaKeywords!: string | null;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    allowCustomMetaTag!: boolean;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    limitedToLocations!: boolean;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    limitedToStores!: boolean;

    @Field(() => String, { nullable: true })
    taxCategory!: string | null;

    @Field(() => Int, { nullable: true })
    pageSize!: number | null;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    allowCustomersToSelectPageSize!: boolean;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    priceRangeFiltering!: boolean;

    @Field(() => Boolean, { defaultValue: false, nullable: false })
    manuallyPriceRange!: boolean;

    @Field(() => Float, { nullable: true })
    priceFrom!: number | null;

    @Field(() => Float, { nullable: true })
    priceTo!: number | null;

    @Field(() => CategoryStatus, { defaultValue: 'Active', nullable: false })
    status!: `${CategoryStatus}`;

    @Field(() => Category, { nullable: true })
    parent?: Category | null;

    @Field(() => [Category], { nullable: true })
    children?: Array<Category>;

    @Field(() => [ProductCategory], { nullable: true })
    products?: Array<ProductCategory>;
}
