import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class ProductCategoryOrderByWithRelationInputStrict
  implements RestrictProperties<ProductCategoryOrderByWithRelationInputStrict, Prisma.ProductCategoryOrderByWithRelationInput>
{
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class ProductCategoryOrderByWithRelationInput extends PartialType(
  ProductCategoryOrderByWithRelationInputStrict,
) {}

@InputType()
export class ProductCategoryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
