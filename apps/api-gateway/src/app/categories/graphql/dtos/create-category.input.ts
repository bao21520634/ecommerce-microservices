import { InputType, PartialType } from '@nestjs/graphql';
import { Category } from '../entity/category.entity';

@InputType()
export class CreateCategoryInput extends PartialType(Category, InputType) {}
