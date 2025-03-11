import { Field, ObjectType } from '@nestjs/graphql';
import { SearchMetadata } from './search-metadata.entity';
import { SearchHit } from './search-hit.entity';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class SearchResponse {
    @Field(() => SearchMetadata)
    metadata?: SearchMetadata;

    @Field(() => [SearchHit])
    hits: SearchHit[];

    @Field(() => GraphQLJSON)
    aggregations: Record<string, any>;
}
