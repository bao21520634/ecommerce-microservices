import { CreateCategoryHandler } from './create-category.handler';
import { DeleteCategoryHandler } from './delete-category.handler';
import { UpdateCategoryHandler } from './update-category.handler';

export const CategoryCommandHandlers = [
    CreateCategoryHandler,
    UpdateCategoryHandler,
    DeleteCategoryHandler,
];
