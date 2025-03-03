import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ChargeStatus } from './charge-status.enum';

@InputType()
export class EnumChargeStatusFieldUpdateOperationsInput {

    @Field(() => ChargeStatus, {nullable:true})
    set?: `${ChargeStatus}`;
}
