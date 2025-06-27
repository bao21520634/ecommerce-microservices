import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrderUpdateInput } from './order-update.input';
import { Type } from 'class-transformer';

@ArgsType()
export class UpdateOneOrderArgs {
    @Field(() => OrderUpdateInput, { nullable: false })
    @Type(() => OrderUpdateInput)
    data!: OrderUpdateInput;

    @Field(() => String, { nullable: false })
    @Type(() => String)
    id!: string;
}
