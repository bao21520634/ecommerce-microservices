import { Common, SearchService } from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { SearchQuery } from './queries';

@Controller('search')
export class SearchController
    implements Partial<SearchService.SearchServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    /**
     * catalogs
     * @param request
     * @param ctx
     */
    @GrpcMethod('SearchService', 'search')
    async search(
        request: Common.SearchParams,
        ctx: any,
    ): Promise<Common.SearchResponse> {
        try {
            return this.queryBus.execute(new SearchQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }
}
