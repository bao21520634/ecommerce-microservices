import { Module } from '@nestjs/common'
import { CategoriesService } from './graphql/categories.service'
import { CategoriesResolver } from './graphql/categories.resolver'
import { CategoriesController } from './rest/categories.controller'

@Module({
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
