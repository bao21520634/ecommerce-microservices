import { registerEnumType } from '@nestjs/graphql';

export enum CheckoutStatus {
    Initiated = "Initiated",
    Processing = "Processing",
    Completed = "Completed",
    Failed = "Failed",
    Cancelled = "Cancelled"
}


registerEnumType(CheckoutStatus, { name: 'CheckoutStatus', description: undefined })
