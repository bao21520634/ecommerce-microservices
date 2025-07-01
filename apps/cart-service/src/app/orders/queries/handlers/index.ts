import { GetOrderHandler } from './get-order.handler';
import { GetOrdersTotalHandler } from './get-orders-total.handler';
import { GetOrdersHandler } from './get-orders.handler';

export const OrderQueryHandlers = [
    GetOrderHandler,
    GetOrdersHandler,
    GetOrdersTotalHandler,
];
