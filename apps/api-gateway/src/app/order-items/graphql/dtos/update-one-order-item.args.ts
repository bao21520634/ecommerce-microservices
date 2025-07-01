import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrderItemUpdateInput } from './order-item-update.input';
import { Type } from 'class-transformer';

@ArgsType()
export class UpdateOneOrderItemArgs {
    @Field(() => OrderItemUpdateInput, { nullable: false })
    @Type(() => OrderItemUpdateInput)
    data!: OrderItemUpdateInput;

    @Field(() => String, { nullable: false })
    @Type(() => String)
    id!: string;
}
