import { GetCategoryHandler } from './categories';
import { GetProductsFromCategoriesHandler } from './product-categories';
import { GetProductHandler, SearchProductsHandler } from './products';

export const SearchQueryHandlers = [
    SearchProductsHandler,
    GetProductHandler,
    GetCategoryHandler,
    GetProductsFromCategoriesHandler,
];
