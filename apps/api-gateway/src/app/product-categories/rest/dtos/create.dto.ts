import { OmitType } from '@nestjs/swagger'
import { ProductCategoryEntity } from '../entity/product-category.entity'

export class CreateProductCategory extends OmitType(ProductCategoryEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
