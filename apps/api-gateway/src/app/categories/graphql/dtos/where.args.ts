import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, Prisma } from '@prisma/client';
import { RestrictProperties } from '../../../common/dtos/common.input';

@InputType()
export class CategoryWhereUniqueInput {
    id: string;
}

@InputType()
export class CategoryWhereInputStrict
    implements
        RestrictProperties<CategoryWhereInputStrict, Prisma.CategoryWhereInput>
{
    id: string | Prisma.StringFilter<'Category'>;
    createdAt: string | Prisma.DateTimeFilter<'Category'> | Date;
    updatedAt: string | Prisma.DateTimeFilter<'Category'> | Date;
    deletedAt: string | Date | Prisma.DateTimeNullableFilter<'Category'>;
    createdBy: string | Prisma.StringNullableFilter<'Category'>;
    updatedBy: string | Prisma.StringNullableFilter<'Category'>;
    deletedBy: string | Prisma.StringNullableFilter<'Category'>;
    name: string | Prisma.StringFilter<'Category'>;
    slug: string | Prisma.StringFilter<'Category'>;
    shortDescription: string | Prisma.StringNullableFilter<'Category'>;
    longDescription: string | Prisma.StringNullableFilter<'Category'>;
    thumbnailUrl: string | Prisma.StringNullableFilter<'Category'>;
    backgroundUrl: string | Prisma.StringNullableFilter<'Category'>;
    templateId: string | Prisma.StringNullableFilter<'Category'>;
    parentId: string | Prisma.StringNullableFilter<'Category'>;
    sortOrder: number | Prisma.IntFilter<'Category'>;
    metaTitle: string | Prisma.StringNullableFilter<'Category'>;
    metaDescription: string | Prisma.StringNullableFilter<'Category'>;
    metaKeywords: string | Prisma.StringNullableFilter<'Category'>;
    allowCustomMetaTag: boolean | Prisma.BoolFilter<'Category'>;
    limitedToLocations: boolean | Prisma.BoolFilter<'Category'>;
    limitedToStores: boolean | Prisma.BoolFilter<'Category'>;
    taxCategory: string | Prisma.StringNullableFilter<'Category'>;
    pageSize: number | Prisma.IntNullableFilter<'Category'>;
    pageSizeOption: Prisma.IntNullableListFilter<'Category'>;
    allowCustomersToSelectPageSize: boolean | Prisma.BoolFilter<'Category'>;
    priceRangeFiltering: boolean | Prisma.BoolFilter<'Category'>;
    manuallyPriceRange: boolean | Prisma.BoolFilter<'Category'>;
    priceFrom: number | Prisma.FloatNullableFilter<'Category'>;
    priceTo: number | Prisma.FloatNullableFilter<'Category'>;
    status: Prisma.EnumCategoryStatusFilter<'Category'> | $Enums.CategoryStatus;
    parent:
        | (Prisma.Without<
              Prisma.CategoryNullableScalarRelationFilter,
              Prisma.CategoryWhereInput
          > &
              Prisma.CategoryWhereInput)
        | (Prisma.Without<
              Prisma.CategoryWhereInput,
              Prisma.CategoryNullableScalarRelationFilter
          > &
              Prisma.CategoryNullableScalarRelationFilter);
    children: Prisma.CategoryListRelationFilter;
    products: Prisma.ProductCategoryListRelationFilter;
    // Todo: Add the below field decorator only to the $Enums types.
    // @Field(() => $Enums.x)

    AND: CategoryWhereInput[];
    OR: CategoryWhereInput[];
    NOT: CategoryWhereInput[];
}

@InputType()
export class CategoryWhereInput extends PartialType(CategoryWhereInputStrict) {}

@InputType()
export class CategoryListRelationFilter {
    every?: CategoryWhereInput;
    some?: CategoryWhereInput;
    none?: CategoryWhereInput;
}

@InputType()
export class CategoryRelationFilter {
    is?: CategoryWhereInput;
    isNot?: CategoryWhereInput;
}
