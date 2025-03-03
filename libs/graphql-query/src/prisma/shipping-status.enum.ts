import { registerEnumType } from '@nestjs/graphql';

export enum ShippingStatus {
    Delivering = "Delivering"
}


registerEnumType(ShippingStatus, { name: 'ShippingStatus', description: undefined })
