import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class CarouselWhereInput {

    @Field(() => [CarouselWhereInput], {nullable:true})
    AND?: Array<CarouselWhereInput>;

    @Field(() => [CarouselWhereInput], {nullable:true})
    OR?: Array<CarouselWhereInput>;

    @Field(() => [CarouselWhereInput], {nullable:true})
    NOT?: Array<CarouselWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    url?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    image?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    buttonCaption?: StringFilter;
}
