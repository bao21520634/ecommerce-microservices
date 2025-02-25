import {
    CatalogService,
    Category,
    Common,
} from '@ecommerce-microservices/proto-schema';
import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
    GetCategoriesQuery,
    GetCategoriesTotalQuery,
    GetCategoryQuery,
} from './queries';
import {
    CreateCategoryCommand,
    DeleteCategoryCommand,
    UpdateCategoryCommand,
} from './commands';
import { ClerkAuthGuard } from '@ecommerce-microservices/common';

@Controller('categories')
// @UseGuards(ClerkAuthGuard)
export class CategoriesController
    implements Partial<CatalogService.CatalogService<any>>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod('CatalogService', 'category')
    async category(
        request: Common.Id,
        ctx: any,
    ): Promise<Category.NullableCategory> {
        try {
            return this.queryBus.execute(new GetCategoryQuery(request.id));
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
    @GrpcMethod('CatalogService', 'categories')
    async categories(
        request: Common.Query,
        ctx: any,
    ): Promise<Category.Categories> {
        try {
            return this.queryBus.execute(new GetCategoriesQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod('CatalogService', 'categoriesTotal')
    async categoriesTotal(
        request: Common.Query,
        ctx: any,
    ): Promise<Common.Count> {
        try {
            return this.queryBus.execute(new GetCategoriesTotalQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    /**
     * create catalog
     * @param request
     * @param ctx
     */
    @GrpcMethod('CatalogService', 'createCategory')
    async createCatalog(
        request: Category.CreateCategoryInput,
        ctx: any,
    ): Promise<Category.Category> {
        try {
            return await this.commandBus.execute(
                new CreateCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod('CatalogService', 'updateCategory')
    async updateCategory(
        request: Category.UpdateCategoryInput,
        ctx: any,
    ): Promise<Category.Category> {
        try {
            return await this.commandBus.execute(
                new UpdateCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod('CatalogService', 'deleteCategory')
    async deleteCategory(
        request: Common.Id,
        ctx: any,
    ): Promise<Category.Category> {
        try {
            return await this.commandBus.execute(
                new DeleteCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
