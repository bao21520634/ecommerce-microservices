import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { SearchResponse } from './entity/search-response.entity';
import { SearchArgs } from './dtos/search.args';

@Resolver(() => SearchResponse)
export class SearchsResolver {
    @Query(() => SearchResponse, { nullable: true })
    async search(
        @Context() context: GqlContext,
        @Args() args: SearchArgs,
    ): Promise<SearchResponse> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.search.svc.search(args, grpcContext),
        );

        return {
            ...result,
            hits: result.hits.map((hit) => ({
                ...hit,
                document: JSON.parse(hit.document.toString()),
            })),
            aggregations: result.aggregations
                ? Object.fromEntries(
                      Object.entries(result.aggregations).map(
                          ([key, value]) => [key, JSON.parse(value.toString())],
                      ),
                  )
                : {},
        };
    }
}
