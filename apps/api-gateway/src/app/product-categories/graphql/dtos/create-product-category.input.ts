import { InputType, PickType } from '@nestjs/graphql'
import { ProductCategory } from '../entity/product-category.entity'

@InputType()
export class CreateProductCategoryInput extends PickType(ProductCategory,[],InputType) {}

