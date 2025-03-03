import { registerEnumType } from '@nestjs/graphql';

export enum PaymentMethod {
    CreditCard = "CreditCard",
    DebitCard = "DebitCard",
    PayPal = "PayPal"
}


registerEnumType(PaymentMethod, { name: 'PaymentMethod', description: undefined })
