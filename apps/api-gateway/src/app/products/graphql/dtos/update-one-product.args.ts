import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProductUpdateInput } from './product-update.input';
import { Type } from 'class-transformer';

@ArgsType()
export class UpdateOneProductArgs {
    @Field(() => ProductUpdateInput, { nullable: false })
    @Type(() => ProductUpdateInput)
    data!: ProductUpdateInput;

    @Field(() => String, { nullable: false })
    @Type(() => String)
    id!: string;
}
