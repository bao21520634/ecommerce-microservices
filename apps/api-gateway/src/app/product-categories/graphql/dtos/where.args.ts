import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ProductCategoryWhereUniqueInput {
  id: number
}

@InputType()
export class ProductCategoryWhereInputStrict implements RestrictProperties<ProductCategoryWhereInputStrict, Prisma.ProductCategoryWhereInput> {
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: ProductCategoryWhereInput[]
  OR: ProductCategoryWhereInput[]
  NOT: ProductCategoryWhereInput[]
}

@InputType()
export class ProductCategoryWhereInput extends PartialType(
  ProductCategoryWhereInputStrict,
) {}

@InputType()
export class ProductCategoryListRelationFilter {
  every?: ProductCategoryWhereInput
  some?: ProductCategoryWhereInput
  none?: ProductCategoryWhereInput
}

@InputType()
export class ProductCategoryRelationFilter {
  is?: ProductCategoryWhereInput
  isNot?: ProductCategoryWhereInput
}
