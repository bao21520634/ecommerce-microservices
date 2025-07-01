import { CategoryStatus } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class CategoryCreateInput {
    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;

    @Field(() => String, { nullable: false })
    name!: string;

    @Field(() => String, { nullable: false })
    slug!: string;

    @Field(() => String, { nullable: true })
    shortDescription?: string;

    @Field(() => String, { nullable: true })
    longDescription?: string;

    @Field(() => String, { nullable: true })
    thumbnail?: string;

    @Field(() => String, { nullable: true })
    backgroundUrl?: string;

    @Field(() => Int, { nullable: true })
    sortOrder?: number;

    @Field(() => String, { nullable: true })
    metaKeywords?: string;

    @Field(() => Boolean, { nullable: true })
    limitedToLocations?: boolean;

    @Field(() => Boolean, { nullable: true })
    limitedToStores?: boolean;

    @Field(() => String, { nullable: true })
    taxCategory?: string;

    @Field(() => CategoryStatus, { nullable: true })
    status?: `${CategoryStatus}`;

    @Field(() => String, { nullable: true })
    parentId?: string;
}
