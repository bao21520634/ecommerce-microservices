import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateProductCategory } from './dtos/create.dto'
import { ProductCategoryQueryDto } from './dtos/query.dto'
import { UpdateProductCategory } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ProductCategoryEntity } from './entity/productCategory.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'


@ApiTags('product-categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductCategoryEntity })
  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategory, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createProductCategoryDto.uid)
    return this.prisma.productCategory.create({ data: createProductCategoryDto })
  }

  @ApiOkResponse({ type: [ProductCategoryEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: ProductCategoryQueryDto) {
    return this.prisma.productCategory.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: ProductCategoryEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.productCategory.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: ProductCategoryEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductCategoryDto: UpdateProductCategory,
    @GetUser() user: GetUserType,
  ) {
    const productCategory = await this.prisma.productCategory.findUnique({ where: { id } })
    checkRowLevelPermission(user, productCategory.uid)
    return this.prisma.productCategory.update({
      where: { id },
      data: updateProductCategoryDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const productCategory = await this.prisma.productCategory.findUnique({ where: { id } })
    checkRowLevelPermission(user, productCategory.uid)
    return this.prisma.productCategory.delete({ where: { id } })
  }
}
