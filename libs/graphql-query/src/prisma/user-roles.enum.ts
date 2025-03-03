import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
    ADMIN = "ADMIN",
    USER = "USER"
}


registerEnumType(UserRoles, { name: 'UserRoles', description: undefined })
