import { Module } from '@nestjs/common'
import { ProductCategoriesService } from './graphql/product-categories.service'
import { ProductCategoriesResolver } from './graphql/product-categories.resolver'
import { ProductCategoriesController } from './rest/product-categories.controller'

@Module({
  providers: [ProductCategoriesResolver, ProductCategoriesService],
  exports: [ProductCategoriesService],
  controllers: [ProductCategoriesController],
})
export class ProductCategoriesModule {}
