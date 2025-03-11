import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchMetadata {
    @Field(() => Int)
    totalResults!: number;

    @Field(() => Int)
    page!: number;

    @Field(() => Int)
    pageSize!: number;

    @Field(() => Int)
    totalPages!: number;
}
