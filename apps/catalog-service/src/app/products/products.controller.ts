import { SERVICE_LIST } from '@ecommerce-microservices/core';
import {
    CatalogService,
    Common,
    Product,
} from '@ecommerce-microservices/proto-schema';
import { Controller, UseGuards } from '@nestjs/common';
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
import { ClerkAuthGuard } from '@ecommerce-microservices/common';

@Controller('products')
// @UseGuards(ClerkAuthGuard)
export class ProductsController
    implements Partial<CatalogService.CatalogService<any>>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod('CatalogService', 'product')
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
    @GrpcMethod('CatalogService', 'products')
    async products(request: Common.Query, ctx: any): Promise<Product.Products> {
        try {
            return this.queryBus.execute(new GetProductsQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod('CatalogService', 'productsTotal')
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
    @GrpcMethod('CatalogService', 'createProduct')
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

    @GrpcMethod('CatalogService', 'updateProduct')
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

    @GrpcMethod('CatalogService', 'deleteProduct')
    async deleteProduct(
        request: Common.Id,
        ctx: any,
    ): Promise<Product.Product> {
        try {
            return await this.commandBus.execute(
                new DeleteProductCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
