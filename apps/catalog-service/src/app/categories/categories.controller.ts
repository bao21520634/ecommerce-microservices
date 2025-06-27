import {
    CatalogService,
    Category,
    Common,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
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

@Controller('categories')
export class CategoriesController
    implements Partial<CatalogService.CatalogServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'category')
    async category(
        request: Common.Id,
        ctx: any,
    ): Promise<Category.NullableCategory> {
        try {
            return this.queryBus.execute(new GetCategoryQuery(request.id));
        } catch (e) {
            console.log('e controller...........', e);
            throw new RpcException(e);
        }
    }

    /**
     * catalogs
     * @param request
     * @param ctx
     */
    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'categories')
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

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'categoriesTotal')
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
    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'createCategory')
    async createCategory(
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

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'updateCategory')
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

    @GrpcMethod(CatalogService.CATALOG_SERVICE_NAME, 'deleteCategory')
    async deleteCategory(
        request: Common.Id,
        ctx: any,
    ): Promise<Common.DeleteResponse> {
        try {
            return await this.commandBus.execute(
                new DeleteCategoryCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
