import { Field, Float, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SearchHit {
    @Field(() => String)
    id!: string;

    @Field(() => Float)
    score!: number;

    @Field(() => String)
    indexName!: string;

    @Field(() => GraphQLJSON)
    document!: any;

    @Field(() => GraphQLJSON, { nullable: true })
    highlights?: Record<string, string>;
}
