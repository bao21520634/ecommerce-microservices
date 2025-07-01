import {
    CartService,
    Order,
    Common,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { GetOrdersQuery, GetOrdersTotalQuery, GetOrderQuery } from './queries';
import {
    CreateOrderCommand,
    DeleteOrderCommand,
    UpdateOrderCommand,
} from './commands';

@Controller('orders')
export class OrdersController
    implements Partial<CartService.CartServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'order')
    async order(request: Common.Id, ctx: any): Promise<Order.NullableOrder> {
        try {
            return this.queryBus.execute(new GetOrderQuery(request.id));
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
    @GrpcMethod(CartService.CART_SERVICE_NAME, 'orders')
    async orders(request: Common.Query, ctx: any): Promise<Order.Orders> {
        try {
            return this.queryBus.execute(new GetOrdersQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'ordersTotal')
    async ordersTotal(request: Common.Query, ctx: any): Promise<Common.Count> {
        try {
            return this.queryBus.execute(new GetOrdersTotalQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    /**
     * create catalog
     * @param request
     * @param ctx
     */
    @GrpcMethod(CartService.CART_SERVICE_NAME, 'createOrder')
    async createOrder(
        request: Order.CreateOrderInput,
        ctx: any,
    ): Promise<Order.Order> {
        try {
            return await this.commandBus.execute(
                new CreateOrderCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'updateOrder')
    async updateOrder(
        request: Order.UpdateOrderInput,
        ctx: any,
    ): Promise<Order.Order> {
        try {
            return await this.commandBus.execute(
                new UpdateOrderCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'deleteOrder')
    async deleteOrder(
        request: Common.Id,
        ctx: any,
    ): Promise<Common.DeleteResponse> {
        try {
            return await this.commandBus.execute(
                new DeleteOrderCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
