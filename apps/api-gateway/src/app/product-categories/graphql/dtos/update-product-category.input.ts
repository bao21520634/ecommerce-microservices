import { CreateProductCategoryInput } from './create-product-category.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { ProductCategory } from '@prisma/client'

@InputType()
export class UpdateProductCategoryInput extends PartialType(CreateProductCategoryInput) {
  id: ProductCategory['id']
}
