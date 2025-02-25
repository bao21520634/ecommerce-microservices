import {
    CatalogService,
    Common,
    ProductCategory,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
    GetProductCategoriesQuery,
    GetProductCategoriesTotalQuery,
    GetProductCategoryQuery,
} from './queries';
import {
    CreateProductCategoryCommand,
    DeleteProductCategoryCommand,
    UpdateProductCategoryCommand,
} from './commands';

@Controller('product-categories')
export class ProductCategoriesController
    implements Partial<CatalogService.CatalogService<any>>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod('CatalogService', 'productCategory')
    async productCategory(
        request: Common.Id,
        ctx: any,
    ): Promise<ProductCategory.NullableProductCategory> {
        try {
            return this.queryBus.execute(
                new GetProductCategoryQuery(request.id),
            );
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
    @GrpcMethod('CatalogService', 'productCategories')
    async productCategories(
        request: Common.Query,
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

    @GrpcMethod('CatalogService', 'productCategoriesTotal')
    async productCategoriesTotal(
        request: Common.Query,
        ctx: any,
    ): Promise<Common.Count> {
        try {
            return this.queryBus.execute(
                new GetProductCategoriesTotalQuery(request),
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

    @GrpcMethod('CatalogService', 'createProductCategory')
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

    @GrpcMethod('CatalogService', 'updateProductCategory')
    async updateProductCategory(
        request: ProductCategory.UpdateProductCategoryInput,
        ctx: any,
    ): Promise<ProductCategory.ProductCategory> {
        try {
            return await this.commandBus.execute(
                new UpdateProductCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod('CatalogService', 'deleteProductCategory')
    async deleteProductCategory(
        request: Common.Id,
        ctx: any,
    ): Promise<ProductCategory.ProductCategory> {
        try {
            return await this.commandBus.execute(
                new DeleteProductCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
