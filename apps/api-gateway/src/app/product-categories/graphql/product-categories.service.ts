import { Injectable } from '@nestjs/common'
import { FindManyProductCategoryArgs, FindUniqueProductCategoryArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateProductCategoryInput } from './dtos/create-product-category.input'
import { UpdateProductCategoryInput } from './dtos/update-product-category.input'

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductCategoryInput: CreateProductCategoryInput) {
    return this.prisma.productCategory.create({
      data: createProductCategoryInput,
    })
  }

  findAll(args: FindManyProductCategoryArgs) {
    return this.prisma.productCategory.findMany(args)
  }

  findOne(args: FindUniqueProductCategoryArgs) {
    return this.prisma.productCategory.findUnique(args)
  }

  update(updateProductCategoryInput: UpdateProductCategoryInput) {
    const { id, ...data } = updateProductCategoryInput
    return this.prisma.productCategory.update({
      where: { id },
      data: data,
    })
  }

  remove(args: FindUniqueProductCategoryArgs) {
    return this.prisma.productCategory.delete(args)
  }
}
