import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CarouselCreateInput } from '../carousel/carousel-create.input';
import { Type } from 'class-transformer';

@InputType()
export class CarouselListCreateEnvelopeInput {

    @Field(() => [CarouselCreateInput], {nullable:true})
    @Type(() => CarouselCreateInput)
    set?: Array<CarouselCreateInput>;
}
