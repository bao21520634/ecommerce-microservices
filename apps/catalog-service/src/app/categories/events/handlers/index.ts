import { CategoryCreatedHandler } from './category-created.handler';
import { CategoryDeletedHandler } from './category-deleted.handler';
import { CategoryUpdatedHandler } from './category-updated.handler';

export const CategoryEventHandlers = [
    CategoryCreatedHandler,
    CategoryDeletedHandler,
    CategoryUpdatedHandler,
];
