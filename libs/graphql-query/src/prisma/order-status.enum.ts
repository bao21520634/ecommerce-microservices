import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
    Draft = "Draft",
    WaitForConfirmation = "WaitForConfirmation",
    ReadyForDelivery = "ReadyForDelivery",
    Delivery = "Delivery",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}


registerEnumType(OrderStatus, { name: 'OrderStatus', description: undefined })
