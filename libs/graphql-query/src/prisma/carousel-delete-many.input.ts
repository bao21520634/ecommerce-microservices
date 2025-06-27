import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CarouselWhereInput } from '../carousel/carousel-where.input';
import { Type } from 'class-transformer';

@InputType()
export class CarouselDeleteManyInput {

    @Field(() => CarouselWhereInput, {nullable:false})
    @Type(() => CarouselWhereInput)
    where!: CarouselWhereInput;
}
