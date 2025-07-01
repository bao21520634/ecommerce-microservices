import {
    CatalogService,
    Common,
    ProductCategory,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { GetProductCategoriesQuery, GetProductCategoryQuery } from './queries';
import {
    CreateProductCategoryCommand,
    DeleteProductCategoryCommand,
} from './commands';

@Controller('product-categories')
export class ProductCategoriesController
    implements Partial<CatalogService.CatalogServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'productCategory')
    async productCategory(
        request: ProductCategory.ProductCategoryInput,
        ctx: any,
    ): Promise<ProductCategory.NullableProductCategory> {
        try {
            return this.queryBus.execute(new GetProductCategoryQuery(request));
        } catch (e) {
            console.log('e controller............', e);
            throw new RpcException(e);
        }
    }

    /**
     * catalogs
     * @param request
     * @param ctx
     */
    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'productCategories')
    async productCategories(
        request: ProductCategory.ProductCategoryFilterInput,
        ctx: any,
    ): Promise<ProductCategory.ProductCategories> {
        try {
            return this.queryBus.execute(
                new GetProductCategoriesQuery(request),
            );
        } catch (e) {
            throw new RpcException(e);
        }
    }

    /**
     * create catalog
     * @param request
     * @param ctx
     */

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'createProductCategory')
    async createProductCategory(
        request: ProductCategory.CreateProductCategoryInput,
        ctx: any,
    ): Promise<ProductCategory.ProductCategory> {
        try {
            return await this.commandBus.execute(
                new CreateProductCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'deleteProductCategory')
    async deleteProductCategory(
        request: ProductCategory.DeleteProductCategoryInput,
        ctx: any,
    ): Promise<Common.DeleteResponse> {
        try {
            return await this.commandBus.execute(
                new DeleteProductCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
