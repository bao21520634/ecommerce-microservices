import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ProductCategoriesService } from './product-categories.service'
import { ProductCategory } from './entity/product-category.entity'
import { FindManyProductCategoryArgs, FindUniqueProductCategoryArgs } from './dtos/find.args'
import { CreateProductCategoryInput } from './dtos/create-product-category.input'
import { UpdateProductCategoryInput } from './dtos/update-product-category.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => ProductCategory)
export class ProductCategoriesResolver {
  constructor(private readonly productCategoriesService: ProductCategoriesService,
    private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @Mutation(() => ProductCategory)
  createProductCategory(@Args('createProductCategoryInput') args: CreateProductCategoryInput, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, args.uid)
    return this.productCategoriesService.create(args)
  }

  @Query(() => [ProductCategory], { name: 'productCategories' })
  findAll(@Args() args: FindManyProductCategoryArgs) {
    return this.productCategoriesService.findAll(args)
  }

  @Query(() => ProductCategory, { name: 'productCategory' })
  findOne(@Args() args: FindUniqueProductCategoryArgs) {
    return this.productCategoriesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => ProductCategory)
  async updateProductCategory(@Args('updateProductCategoryInput') args: UpdateProductCategoryInput, @GetUser() user: GetUserType) {
    const productCategory = await this.prisma.productCategory.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, productCategory.uid)
    return this.productCategoriesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => ProductCategory)
  async removeProductCategory(@Args() args: FindUniqueProductCategoryArgs, @GetUser() user: GetUserType) {
    const productCategory = await this.prisma.productCategory.findUnique(args)
    checkRowLevelPermission(user, productCategory.uid)
    return this.productCategoriesService.remove(args)
  }
}
