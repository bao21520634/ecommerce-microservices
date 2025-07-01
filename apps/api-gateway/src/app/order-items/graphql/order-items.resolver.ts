import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { OrderItem as OrderItemDto } from './entity/order-items.entity';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { transformFindArgsToGrpcQuery } from '@ecommerce-microservices/common';
import { lastValueFrom } from 'rxjs';
import { FindManyOrderItemArgs } from './dtos/find-many-order-item.args';

@Resolver(() => OrderItemDto)
export class OrderItemsResolver {
    @Query(() => OrderItemDto, { nullable: true })
    async orderItem(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ): Promise<OrderItemDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.cart.svc.orderItem(
                {
                    id,
                },
                grpcContext,
            ),
        );

        return result.data as OrderItemDto;
    }

    @Query(() => [OrderItemDto])
    async orderItems(
        @Context() context: GqlContext,
        @Args() args: FindManyOrderItemArgs,
    ): Promise<OrderItemDto[]> {
        const grpcContext = setRpcContext(context);

        const orderItems = await lastValueFrom(
            context.rpc.cart.svc.orderItems(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return orderItems.orderItems as OrderItemDto[];
    }

    @Query(() => Int)
    async orderItemsTotal(
        @Context() context: GqlContext,
        @Args() args: FindManyOrderItemArgs,
    ): Promise<number> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.cart.svc.orderItemsTotal(
                transformFindArgsToGrpcQuery(args),
                grpcContext,
            ),
        );

        return result.totalCount ?? 0;
    }
}
