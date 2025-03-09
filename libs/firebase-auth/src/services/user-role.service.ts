import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserRoleService {
    constructor(private prisma: PrismaClient) {}

    async getUserByFirebaseUid(firebaseUid: string) {
        return this.prisma.user.findUnique({
            where: { firebaseUid },
            include: {
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });
    }

    async findOrCreateUser(firebaseUid: string, metadata?: any) {
        let user = await this.prisma.user.findUnique({
            where: { firebaseUid },
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    firebaseUid,
                    metadata: metadata || {},
                },
            });
        }

        return user;
    }

    async assignRoleToUser(firebaseUid: string, roleName: string) {
        const [user, role] = await Promise.all([
            this.findOrCreateUser(firebaseUid),
            this.prisma.role.findUnique({
                where: { name: roleName },
            }),
        ]);

        if (!role) {
            throw new Error(`Role ${roleName} not found`);
        }

        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                roles: {
                    connect: { id: role.id },
                },
            },
            include: {
                roles: true,
            },
        });
    }

    async removeRoleFromUser(firebaseUid: string, roleName: string) {
        const user = await this.prisma.user.findUnique({
            where: { firebaseUid },
            include: {
                roles: true,
            },
        });

        if (!user) {
            throw new Error(`User with Firebase UID ${firebaseUid} not found`);
        }

        const role = await this.prisma.role.findUnique({
            where: { name: roleName },
        });

        if (!role) {
            throw new Error(`Role ${roleName} not found`);
        }

        return this.prisma.user.update({
            where: { id: user.id },
            data: {
                roles: {
                    disconnect: { id: role.id },
                },
            },
            include: {
                roles: true,
            },
        });
    }

    async userHasRole(firebaseUid: string, roleName: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { firebaseUid },
            include: {
                roles: true,
            },
        });

        if (!user) return false;

        return user.roles.some((role) => role.name === roleName);
    }

    async getUserPermissions(firebaseUid: string) {
        const user = await this.prisma.user.findUnique({
            where: { firebaseUid },
            include: {
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
        });

        if (!user) return [];

        return user.roles.flatMap((role) => role.permissions);
    }
}
