import { ObjectType } from '@nestjs/graphql';
import { $Enums, Category as CategoryType } from '@prisma/client';
import { RestrictProperties } from '../../../common/dtos/common.input';

@ObjectType()
export class Category implements RestrictProperties<Category, CategoryType> {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    slug: string;
    shortDescription: string;
    longDescription: string;
    thumbnailUrl: string;
    backgroundUrl: string;
    templateId: string;
    parentId: string;
    sortOrder: number;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    allowCustomMetaTag: boolean;
    limitedToLocations: boolean;
    limitedToStores: boolean;
    taxCategory: string;
    pageSize: number;
    pageSizeOption: number[];
    allowCustomersToSelectPageSize: boolean;
    priceRangeFiltering: boolean;
    manuallyPriceRange: boolean;
    priceFrom: number;
    priceTo: number;
    status: $Enums.CategoryStatus;
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
