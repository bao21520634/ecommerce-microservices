import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatus {
    Pending = "Pending",
    Paid = "Paid",
    UnPaid = "UnPaid"
}


registerEnumType(PaymentStatus, { name: 'PaymentStatus', description: undefined })
