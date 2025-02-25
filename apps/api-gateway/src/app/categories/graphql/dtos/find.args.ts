import {
    ArgsType,
    Field,
    registerEnumType,
    PartialType,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CategoryOrderByWithRelationInput } from './order-by.args';
import { CategoryWhereInput, CategoryWhereUniqueInput } from './where.args';
import { RestrictProperties } from '../../../common/dtos/common.input';
import { DefaultArgs } from '@prisma/client/runtime/library';

registerEnumType(Prisma.CategoryScalarFieldEnum, {
    name: 'CategoryScalarFieldEnum',
});

@ArgsType()
class FindManyCategoryArgsStrict
    implements
        RestrictProperties<
            FindManyCategoryArgsStrict,
            Omit<Prisma.CategoryFindManyArgs, 'include' | 'select'>
        >
{
    omit: Prisma.CategoryOmit<DefaultArgs>;
    where: CategoryWhereInput;
    orderBy: CategoryOrderByWithRelationInput[];
    cursor: CategoryWhereUniqueInput;
    take: number;
    skip: number;
    @Field(() => [Prisma.CategoryScalarFieldEnum])
    distinct: Prisma.CategoryScalarFieldEnum[];
}

@ArgsType()
export class FindManyCategoryArgs extends PartialType(
    FindManyCategoryArgsStrict,
) {}

@ArgsType()
export class FindUniqueCategoryArgs {
    where: CategoryWhereUniqueInput;
}
