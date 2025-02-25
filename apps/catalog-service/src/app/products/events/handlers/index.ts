import { ProductCreatedHandler } from './product-created.handler';
import { ProductDeletedHandler } from './product-deleted.handler';
import { ProductUpdatedHandler } from './product-updated.handler';

export const ProductEventHandlers = [
    ProductCreatedHandler,
    ProductDeletedHandler,
    ProductUpdatedHandler,
];
