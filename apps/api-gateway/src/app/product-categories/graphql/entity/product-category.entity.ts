import { ObjectType } from '@nestjs/graphql'
import { ProductCategory as ProductCategoryType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class ProductCategory implements RestrictProperties<ProductCategory,ProductCategoryType> {
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
