import {
    PermissionGuard,
    PermissionService,
    RoleGuard,
    RoleService,
    UserRoleService,
} from '@ecommerce-microservices/firebase-auth';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
    providers: [
        RoleService,
        PermissionService,
        UserRoleService,
        RoleGuard,
        PermissionGuard,
        PrismaClient,
    ],
    exports: [
        RoleService,
        PermissionService,
        UserRoleService,
        RoleGuard,
        PermissionGuard,
    ],
})
export class RoleModule {}
