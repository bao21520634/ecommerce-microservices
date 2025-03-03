import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
    Active = "Active",
    Locked = "Locked",
    Deleted = "Deleted"
}


registerEnumType(ProductStatus, { name: 'ProductStatus', description: undefined })
