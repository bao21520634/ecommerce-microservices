import { ProductCategoryCreatedHandler } from './product-category-created.handler';
import { ProductCategoryDeletedHandler } from './product-category-deleted.handler';

export const ProductCategoryEventHandlers = [
    ProductCategoryCreatedHandler,
    ProductCategoryDeletedHandler,
];
