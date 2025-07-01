import { Field, Int, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ProductCategorySearchArgs {
    @Field(() => [String])
    categoryIds!: Array<string>;

    @Field(() => Int)
    page!: number;

    @Field(() => Int)
    pageSize!: number;

    @Field(() => [String])
    filters!: string[];

    @Field(() => [String])
    sortBy!: string[];
}
