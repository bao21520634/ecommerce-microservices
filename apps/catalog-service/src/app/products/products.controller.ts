import {
    CatalogService,
    Common,
    Product,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
    GetProductQuery,
    GetProductsQuery,
    GetProductsTotalQuery,
} from './queries';
import {
    CreateProductCommand,
    DeleteProductCommand,
    UpdateProductCommand,
} from './commands';

@Controller('products')
export class ProductsController
    implements Partial<CatalogService.CatalogServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'product')
    async product(
        request: Common.Id,
        ctx: any,
    ): Promise<Product.NullableProduct> {
        try {
            return this.queryBus.execute(new GetProductQuery(request.id));
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
    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'products')
    async products(request: Common.Query, ctx: any): Promise<Product.Products> {
        try {
            return this.queryBus.execute(new GetProductsQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'productsTotal')
    async productsTotal(
        request: Common.Query,
        ctx: any,
    ): Promise<Common.Count> {
        try {
            return this.queryBus.execute(new GetProductsTotalQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    /**
     * create catalog
     * @param request
     * @param ctx
     */
    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'createProduct')
    async createProduct(
        request: Product.CreateProductInput,
        ctx: any,
    ): Promise<Product.Product> {
        try {
            return await this.commandBus.execute(
                new CreateProductCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'updateProduct')
    async updateProduct(
        request: Product.UpdateProductInput,
        ctx: any,
    ): Promise<Product.Product> {
        try {
            return await this.commandBus.execute(
                new UpdateProductCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'deleteProduct')
    async deleteProduct(
        request: Common.Id,
        ctx: any,
    ): Promise<Common.DeleteResponse> {
        try {
            return await this.commandBus.execute(
                new DeleteProductCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
