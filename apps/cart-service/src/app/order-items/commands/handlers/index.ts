import { CreateOrderItemHandler } from './create-order-item.handler';
import { DeleteOrderItemHandler } from './delete-order-item.handler';
import { UpdateOrderItemHandler } from './update-order-item.handler';

export const OrderItemCommandHandlers = [
    CreateOrderItemHandler,
    UpdateOrderItemHandler,
    DeleteOrderItemHandler,
];
