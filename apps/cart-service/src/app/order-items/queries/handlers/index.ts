import { GetOrderItemHandler } from './get-order-item.handler';
import { GetOrderItemsTotalHandler } from './get-order-items-total.handler';
import { GetOrderItemsHandler } from './get-order-items.handler';

export const OrderItemQueryHandlers = [
    GetOrderItemHandler,
    GetOrderItemsHandler,
    GetOrderItemsTotalHandler,
];
