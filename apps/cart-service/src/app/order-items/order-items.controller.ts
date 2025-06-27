import {
    CartService,
    OrderItem,
    Common,
} from '@ecommerce-microservices/proto-schema';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
    GetOrderItemsQuery,
    GetOrderItemsTotalQuery,
    GetOrderItemQuery,
} from './queries';
import {
    CreateOrderItemCommand,
    DeleteOrderItemCommand,
    UpdateOrderItemCommand,
} from './commands';

@Controller('order-items')
export class OrderItemsController
    implements Partial<CartService.CartServiceController>
{
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'orderItem')
    async orderItem(
        request: Common.Id,
        ctx: any,
    ): Promise<OrderItem.NullableOrderItem> {
        try {
            return this.queryBus.execute(new GetOrderItemQuery(request.id));
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
    @GrpcMethod(CartService.CART_SERVICE_NAME, 'orderItems')
    async orderItems(
        request: Common.Query,
        ctx: any,
    ): Promise<OrderItem.OrderItems> {
        try {
            return this.queryBus.execute(new GetOrderItemsQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'orderItemsTotal')
    async orderItemsTotal(
        request: Common.Query,
        ctx: any,
    ): Promise<Common.Count> {
        try {
            return this.queryBus.execute(new GetOrderItemsTotalQuery(request));
        } catch (e) {
            throw new RpcException(e);
        }
    }

    /**
     * create catalog
     * @param request
     * @param ctx
     */
    @GrpcMethod(CartService.CART_SERVICE_NAME, 'createOrderItem')
    async createOrderItem(
        request: OrderItem.CreateOrderItemInput,
        ctx: any,
    ): Promise<OrderItem.OrderItem> {
        try {
            return await this.commandBus.execute(
                new CreateOrderItemCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'updateOrderItem')
    async updateOrderItem(
        request: OrderItem.UpdateOrderItemInput,
        ctx: any,
    ): Promise<OrderItem.OrderItem> {
        try {
            return await this.commandBus.execute(
                new UpdateOrderItemCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }

    @GrpcMethod(CartService.CART_SERVICE_NAME, 'deleteOrderItem')
    async deleteOrderItem(
        request: Common.Id,
        ctx: any,
    ): Promise<Common.DeleteResponse> {
        try {
            return await this.commandBus.execute(
                new DeleteOrderItemCommand(request),
            );
        } catch (errors) {
            throw new RpcException(errors);
        }
    }
}
