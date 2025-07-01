import {
    Category,
    Common,
    Elastic,
    Product,
    ProductCategory,
    SearchService,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
    GetCategoryQuery,
    GetProductQuery,
    GetProductsFromCategoriesQuery,
    SearchProductsQuery,
} from './queries';

@Controller('search')
export class SearchController
    implements Partial<SearchService.SearchServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(SearchService.SEARCH_SERVICE_NAME, 'search')
    async search(
        request: Elastic.SearchParams,
        ctx: any,
    ): Promise<Elastic.SearchResponse> {
        try {
            return this.queryBus.execute(new SearchProductsQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod(SearchService.SEARCH_SERVICE_NAME, 'getProductsFromCategories')
    async getProductsFromCategories(
        request: ProductCategory.ProductCategorySearchInput,
        ctx: any,
    ): Promise<Elastic.SearchResponse> {
        try {
            return this.queryBus.execute(
                new GetProductsFromCategoriesQuery(request),
            );
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod(SearchService.SEARCH_SERVICE_NAME, 'getProduct')
    async getProduct(
        request: Common.Id,
        ctx: any,
    ): Promise<Product.NullableProduct> {
        try {
            return this.queryBus.execute(new GetProductQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod(SearchService.SEARCH_SERVICE_NAME, 'getCategory')
    async getCategory(
        request: Common.Id,
        ctx: any,
    ): Promise<Category.NullableCategory> {
        try {
            return this.queryBus.execute(new GetCategoryQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }
}
