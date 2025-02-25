import { PartialType } from '@nestjs/swagger'
import { CreateProductCategory } from './create.dto'
import { ProductCategory } from '@prisma/client'

export class UpdateProductCategory extends PartialType(CreateProductCategory) {
  id: ProductCategory['id']
}

