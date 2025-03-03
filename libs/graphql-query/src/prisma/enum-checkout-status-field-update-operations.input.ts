import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CheckoutStatus } from './checkout-status.enum';

@InputType()
export class EnumCheckoutStatusFieldUpdateOperationsInput {

    @Field(() => CheckoutStatus, {nullable:true})
    set?: `${CheckoutStatus}`;
}
