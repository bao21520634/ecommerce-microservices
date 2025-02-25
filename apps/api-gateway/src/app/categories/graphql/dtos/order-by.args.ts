import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RestrictProperties } from '../../../common/dtos/common.input';

@InputType()
export class CategoryOrderByWithRelationInputStrict
    implements
        RestrictProperties<
            CategoryOrderByWithRelationInputStrict,
            Prisma.CategoryOrderByWithRelationInput
        >
{
    id: Prisma.SortOrder;
    createdAt: Prisma.SortOrder;
    updatedAt: Prisma.SortOrder;
    deletedAt: Prisma.SortOrder;
    createdBy: Prisma.SortOrder;
    updatedBy: Prisma.SortOrder;
    deletedBy: Prisma.SortOrder;
    name: Prisma.SortOrder;
    slug: Prisma.SortOrder;
    shortDescription: Prisma.SortOrder;
    longDescription: Prisma.SortOrder;
    thumbnailUrl: Prisma.SortOrder;
    backgroundUrl: Prisma.SortOrder;
    templateId: Prisma.SortOrder;
    parentId: Prisma.SortOrder;
    sortOrder: Prisma.SortOrder;
    metaTitle: Prisma.SortOrder;
    metaDescription: Prisma.SortOrder;
    metaKeywords: Prisma.SortOrder;
    allowCustomMetaTag: Prisma.SortOrder;
    limitedToLocations: Prisma.SortOrder;
    limitedToStores: Prisma.SortOrder;
    taxCategory: Prisma.SortOrder;
    pageSize: Prisma.SortOrder;
    pageSizeOption: Prisma.SortOrder;
    allowCustomersToSelectPageSize: Prisma.SortOrder;
    priceRangeFiltering: Prisma.SortOrder;
    manuallyPriceRange: Prisma.SortOrder;
    priceFrom: Prisma.SortOrder;
    priceTo: Prisma.SortOrder;
    status: Prisma.SortOrder;
    parent: Prisma.CategoryOrderByWithRelationInput;
    children: Prisma.CategoryOrderByRelationAggregateInput;
    products: Prisma.ProductCategoryOrderByRelationAggregateInput;
    // Todo: Add below field decorator to the SortOrder properties.
    // @Field(() => Prisma.SortOrder)
}

@InputType()
export class CategoryOrderByWithRelationInput extends PartialType(
    CategoryOrderByWithRelationInputStrict,
) {}

@InputType()
export class CategoryOrderByRelationAggregateInput {
    @Field(() => Prisma.SortOrder)
    _count?: Prisma.SortOrder;
}
