import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { Order as OrderDto } from './entity/orders.entity';
import {
    GqlContext,
    RESOURCES,
    SCOPES,
    setRpcContext,
} from '@ecommerce-microservices/core';
import { transformFindArgsToGrpcQuery } from '@ecommerce-microservices/common';
import { lastValueFrom } from 'rxjs';
import { FindManyOrderArgs } from './dtos/find-many-order.args';
import { Public, Resource, Scopes } from 'nest-keycloak-connect';

@Resolver(() => OrderDto)
@Resource(RESOURCES.CATEGORY)
@Public()
@Scopes(SCOPES.READ)
export class OrdersResolver {
    @Query(() => OrderDto, { nullable: true })
    async order(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ): Promise<OrderDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.cart.svc.order(
                {
                    id,
                },
                grpcContext,
            ),
        );

        return result.data as OrderDto;
    }

    @Query(() => [OrderDto])
    async orders(
        @Context() context: GqlContext,
        @Args() args: FindManyOrderArgs,
    ): Promise<OrderDto[]> {
        const grpcContext = setRpcContext(context);

        const orders = await lastValueFrom(
            context.rpc.cart.svc.orders(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return orders.orders as OrderDto[];
    }

    @Query(() => Int)
    async ordersTotal(
        @Context() context: GqlContext,
        @Args() args: FindManyOrderArgs,
    ): Promise<number> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.cart.svc.ordersTotal(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return result.totalCount ?? 0;
    }
}
