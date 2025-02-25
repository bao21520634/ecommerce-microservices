import { ProductCategoryCreatedHandler } from './product-category-created.handler';
import { ProductCategoryDeletedHandler } from './product-category-deleted.handler';
import { ProductCategoryUpdatedHandler } from './product-category-updated.handler';

export const ProductCategoryEventHandlers = [
    ProductCategoryCreatedHandler,
    ProductCategoryDeletedHandler,
    ProductCategoryUpdatedHandler,
];
