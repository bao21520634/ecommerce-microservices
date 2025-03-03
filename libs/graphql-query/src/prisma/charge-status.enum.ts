import { registerEnumType } from '@nestjs/graphql';

export enum ChargeStatus {
    Pending = "Pending",
    Succeeded = "Succeeded",
    Failed = "Failed",
    Refunded = "Refunded"
}


registerEnumType(ChargeStatus, { name: 'ChargeStatus', description: undefined })
