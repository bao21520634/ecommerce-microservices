import { registerEnumType } from '@nestjs/graphql';

export enum CategoryStatus {
    Active = "Active",
    Locked = "Locked",
    Deleted = "Deleted"
}


registerEnumType(CategoryStatus, { name: 'CategoryStatus', description: undefined })
