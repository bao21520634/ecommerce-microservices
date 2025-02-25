import { CreateProductCategoryHandler } from './create-product-category.handler';
import { DeleteProductCategoryHandler } from './delete-product-category.handler';
import { UpdateProductCategoryHandler } from './update-product-category.handler';

export const ProductCategoryCommandHandlers = [
    CreateProductCategoryHandler,
    UpdateProductCategoryHandler,
    DeleteProductCategoryHandler,
];
