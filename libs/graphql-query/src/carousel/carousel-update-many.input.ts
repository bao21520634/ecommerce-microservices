import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CarouselWhereInput } from './carousel-where.input';
import { Type } from 'class-transformer';
import { CarouselUpdateInput } from './carousel-update.input';

@InputType()
export class CarouselUpdateManyInput {

    @Field(() => CarouselWhereInput, {nullable:false})
    @Type(() => CarouselWhereInput)
    where!: CarouselWhereInput;

    @Field(() => CarouselUpdateInput, {nullable:false})
    @Type(() => CarouselUpdateInput)
    data!: CarouselUpdateInput;
}
