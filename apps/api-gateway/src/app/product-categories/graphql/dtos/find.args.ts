import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { ProductCategoryOrderByWithRelationInput } from './order-by.args'
import { ProductCategoryWhereInput, ProductCategoryWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(Prisma.ProductCategoryScalarFieldEnum, {
  name: 'ProductCategoryScalarFieldEnum',
})

@ArgsType()
class FindManyProductCategoryArgsStrict
  implements RestrictProperties<FindManyProductCategoryArgsStrict, Omit<Prisma.ProductCategoryFindManyArgs, 'include' | 'select'>>
{
  where: ProductCategoryWhereInput
  orderBy: ProductCategoryOrderByWithRelationInput[]
  cursor: ProductCategoryWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ProductCategoryScalarFieldEnum])
  distinct: Prisma.ProductCategoryScalarFieldEnum[]
}

@ArgsType()
export class FindManyProductCategoryArgs extends PartialType(
  FindManyProductCategoryArgsStrict,
) {}

@ArgsType()
export class FindUniqueProductCategoryArgs {
  where: ProductCategoryWhereUniqueInput
}