import { CoreModule } from '@ecommerce-microservices/core';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@Module({
    imports: [
        CoreModule,
        ProductsModule,
        CategoriesModule,
        ProductCategoriesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
