import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Product } from '../../../products/graphql/entity/products.entity';
import { Category } from '../../../categories/graphql/entity/categories.entity';

@ObjectType()
export class ProductCategory {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: false })
    categoryId!: string;

    @Field(() => String, { nullable: false })
    productId!: string;

    @Field(() => Category, { nullable: false })
    category?: Category;

    @Field(() => Product, { nullable: false })
    product?: Product;
}
