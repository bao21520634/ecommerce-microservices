import { StringFilter } from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ProductCategoryWhereInput {
    @Field(() => [ProductCategoryWhereInput], { nullable: true })
    AND?: Array<ProductCategoryWhereInput>;

    @Field(() => [ProductCategoryWhereInput], { nullable: true })
    OR?: Array<ProductCategoryWhereInput>;

    @Field(() => [ProductCategoryWhereInput], { nullable: true })
    NOT?: Array<ProductCategoryWhereInput>;

    @Field(() => StringFilter, { nullable: true })
    id?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    categoryId?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    productId?: StringFilter;
}
