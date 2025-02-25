import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { Category } from './entity/category.entity';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { BaseUniqueFilterArgs } from '../../common/dtos/common.dto';
import { from } from 'rxjs';

@Resolver(() => Category)
export class CategoriesResolver {
    @Query(() => Category, { nullable: true })
    async category(
        @Context() context: GqlContext,
        @Args() args: BaseUniqueFilterArgs,
    ): Promise<Category> {
        const grpcContext = setRpcContext(context);

        return from(
            context.rpc.catalog.svc.category(grpcContext, {
                id: args.id,
            }),
        );
    }
}
