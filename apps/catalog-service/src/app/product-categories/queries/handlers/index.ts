import { GetProductCategoriesTotalHandler } from './get-product-categories-total.handler';
import { GetProductCategoriesHandler } from './get-product-categories.handler';
import { GetProductCategoryHandler } from './get-product-category.handler';

export const ProductCategoryQueryHandlers = [
    GetProductCategoryHandler,
    GetProductCategoriesHandler,
    GetProductCategoriesTotalHandler,
];
