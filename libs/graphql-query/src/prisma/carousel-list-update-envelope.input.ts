import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CarouselCreateInput } from '../carousel/carousel-create.input';
import { Type } from 'class-transformer';
import { CarouselUpdateManyInput } from '../carousel/carousel-update-many.input';
import { CarouselDeleteManyInput } from './carousel-delete-many.input';

@InputType()
export class CarouselListUpdateEnvelopeInput {

    @Field(() => [CarouselCreateInput], {nullable:true})
    @Type(() => CarouselCreateInput)
    set?: Array<CarouselCreateInput>;

    @Field(() => [CarouselCreateInput], {nullable:true})
    push?: Array<CarouselCreateInput>;

    @Field(() => CarouselUpdateManyInput, {nullable:true})
    @Type(() => CarouselUpdateManyInput)
    updateMany?: CarouselUpdateManyInput;

    @Field(() => CarouselDeleteManyInput, {nullable:true})
    @Type(() => CarouselDeleteManyInput)
    deleteMany?: CarouselDeleteManyInput;
}
