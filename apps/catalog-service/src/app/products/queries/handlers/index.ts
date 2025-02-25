import { GetProductHandler } from './get-product.handler';
import { GetProductsTotalHandler } from './get-products-total.handler';
import { GetProductsHandler } from './get-products.handler';

export const ProductQueryHandlers = [
    GetProductHandler,
    GetProductsHandler,
    GetProductsTotalHandler,
];
