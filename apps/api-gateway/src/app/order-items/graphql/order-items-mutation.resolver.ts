import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { OrderItem as OrderItemDto } from './entity/order-items.entity';
import { CreateOneOrderItemArgs } from './dtos/create-one-order-item.args';
import { UpdateOneOrderItemArgs } from './dtos/update-one-order-item.args';

@Resolver(() => OrderItemDto)
export class OrderItemsMutationResolver {
    @Mutation(() => OrderItemDto, { nullable: true })
    async createOrderItem(
        @Context() context: GqlContext,
        @Args() input: CreateOneOrderItemArgs,
    ): Promise<OrderItemDto> {
        const grpcContext = setRpcContext(context);

        const data = input.data;

        try {
            const result = await lastValueFrom(
                context.rpc.cart.svc.createOrderItem(
                    {
                        data,
                    },
                    grpcContext,
                ),
            );

            return result as OrderItemDto;
        } catch (error) {
            console.error('gRPC call error:', error);
            throw error;
        }
    }

    @Mutation(() => OrderItemDto, { nullable: true })
    async updateOrderItem(
        @Context() context: GqlContext,
        @Args() input: UpdateOneOrderItemArgs,
    ): Promise<OrderItemDto> {
        const grpcContext = setRpcContext(context);

        const { id, data } = input;

        const result = await lastValueFrom(
            context.rpc.cart.svc.updateOrderItem({ id, data }, grpcContext),
        );

        return result as OrderItemDto;
    }

    @Mutation(() => OrderItemDto, { nullable: true })
    async deleteOrderItem(
        @Context() context: GqlContext,
        @Args('id') id: string,
    ) {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.cart.svc.deleteOrderItem({ id }, grpcContext),
        );

        return !!result;
    }
}
