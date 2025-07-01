import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';

@InputType()
export class PaymentMethodWhereInput {

    @Field(() => [PaymentMethodWhereInput], {nullable:true})
    AND?: Array<PaymentMethodWhereInput>;

    @Field(() => [PaymentMethodWhereInput], {nullable:true})
    OR?: Array<PaymentMethodWhereInput>;

    @Field(() => [PaymentMethodWhereInput], {nullable:true})
    NOT?: Array<PaymentMethodWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => FloatFilter, {nullable:true})
    commission?: FloatFilter;
}
