import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import {
    GqlContext,
    RESOURCES,
    ROLES,
    setRpcContext,
} from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { Order as OrderDto } from './entity/orders.entity';
import { CreateOneOrderArgs } from './dtos/create-one-order.args';
import { UpdateOneOrderArgs } from './dtos/update-one-order.args';
import { Public, Resource, Roles } from 'nest-keycloak-connect';

@Resolver(() => OrderDto)
@Resource(RESOURCES.CATEGORY)
@Roles({ roles: [ROLES.ADMIN] })
export class OrdersMutationResolver {
    @Mutation(() => OrderDto, { nullable: true })
    @Public()
    async createOrder(
        @Context() context: GqlContext,
        @Args() input: CreateOneOrderArgs,
    ): Promise<OrderDto> {
        const grpcContext = setRpcContext(context);

        const data = input.data;

        try {
            const result = await lastValueFrom(
                context.rpc.cart.svc.createOrder(
                    {
                        data: {
                            ...data,
                            paymentResult: JSON.stringify(data.paymentResult),
                        },
                    },
                    grpcContext,
                ),
            );

            return result as OrderDto;
        } catch (error) {
            console.error('gRPC call error:', error);
            throw error;
        }
    }

    @Mutation(() => OrderDto, { nullable: true })
    async updateOrder(
        @Context() context: GqlContext,
        @Args() input: UpdateOneOrderArgs,
    ): Promise<OrderDto> {
        const grpcContext = setRpcContext(context);

        const { id, data } = input;

        const updateData = {
            ...data,
            paymentResult: data.paymentResult
                ? JSON.stringify(data.paymentResult)
                : undefined,
        };

        const result = await lastValueFrom(
            context.rpc.cart.svc.updateOrder(
                {
                    id: id,
                    data: updateData,
                },
                grpcContext,
            ),
        );

        return result as OrderDto;
    }

    @Mutation(() => OrderDto, { nullable: true })
    async deleteOrder(@Context() context: GqlContext, @Args('id') id: string) {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.cart.svc.deleteOrder({ id }, grpcContext),
        );

        return !!result;
    }
}
