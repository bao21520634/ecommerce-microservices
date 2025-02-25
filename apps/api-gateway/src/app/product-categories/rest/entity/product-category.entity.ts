import { ProductCategory } from '@prisma/client'
import { IsDate, IsString, IsInt } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class ProductCategoryEntity implements RestrictProperties<ProductCategoryEntity, ProductCategory> {

}

