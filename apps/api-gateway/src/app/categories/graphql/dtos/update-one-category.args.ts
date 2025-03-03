import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryUpdateInput } from './category-update.input';
import { Type } from 'class-transformer';

@ArgsType()
export class UpdateOneCategoryArgs {
    @Field(() => CategoryUpdateInput, { nullable: false })
    @Type(() => CategoryUpdateInput)
    data!: CategoryUpdateInput;

    @Field(() => String, { nullable: false })
    @Type(() => String)
    id!: string;
}
