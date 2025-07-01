import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class SiteSettingsOrderByInput {

    @Field(() => SortOrder, {nullable:true})
    name?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    url?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    logo?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    slogan?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    description?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    keywords?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    email?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    phone?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    author?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    copyright?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    address?: `${SortOrder}`;
}
