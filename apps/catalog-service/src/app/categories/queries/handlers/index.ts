import { GetCategoriesTotalHandler } from './get-categories-total.handler';
import { GetCategoriesHandler } from './get-categories.handler';
import { GetCategoryHandler } from './get-category.handler';

export const CategoryQueryHandlers = [
    GetCategoryHandler,
    GetCategoriesHandler,
    GetCategoriesTotalHandler,
];
