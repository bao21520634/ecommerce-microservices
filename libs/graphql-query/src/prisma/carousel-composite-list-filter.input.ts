import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CarouselObjectEqualityInput } from './carousel-object-equality.input';
import { CarouselWhereInput } from '../carousel/carousel-where.input';

@InputType()
export class CarouselCompositeListFilter {

    @Field(() => [CarouselObjectEqualityInput], {nullable:true})
    equals?: Array<CarouselObjectEqualityInput>;

    @Field(() => CarouselWhereInput, {nullable:true})
    every?: CarouselWhereInput;

    @Field(() => CarouselWhereInput, {nullable:true})
    some?: CarouselWhereInput;

    @Field(() => CarouselWhereInput, {nullable:true})
    none?: CarouselWhereInput;

    @Field(() => Boolean, {nullable:true})
    isEmpty?: boolean;

    @Field(() => Boolean, {nullable:true})
    isSet?: boolean;
}
