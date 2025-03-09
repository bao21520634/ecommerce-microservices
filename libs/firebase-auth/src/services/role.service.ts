import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaClient) {}

    async findAll() {
        return this.prisma.role.findMany({
            include: {
                permissions: true,
            },
        });
    }

    async findOne(id: string) {
        return this.prisma.role.findUnique({
            where: { id },
            include: {
                permissions: true,
            },
        });
    }

    async findByName(name: string) {
        return this.prisma.role.findUnique({
            where: { name },
            include: {
                permissions: true,
            },
        });
    }

    async create(data: {
        name: string;
        description?: string;
        permissionIds?: string[];
    }) {
        return this.prisma.role.create({
            data: {
                name: data.name,
                description: data.description,
                permissions: data.permissionIds
                    ? {
                          connect: data.permissionIds.map((id) => ({ id })),
                      }
                    : undefined,
            },
            include: {
                permissions: true,
            },
        });
    }

    async update(
        id: string,
        data: {
            name?: string;
            description?: string;
            permissionIds?: string[];
        },
    ) {
        // If permissionIds is provided, replace all permissions
        if (data.permissionIds) {
            // First disconnect all existing permissions
            await this.prisma.role.update({
                where: { id },
                data: {
                    permissions: {
                        set: [],
                    },
                },
            });

            // Then connect the new permissions
            return this.prisma.role.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    permissions: {
                        connect: data.permissionIds.map((id) => ({ id })),
                    },
                },
                include: {
                    permissions: true,
                },
            });
        }

        // Otherwise just update the role data
        return this.prisma.role.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
            },
            include: {
                permissions: true,
            },
        });
    }

    async delete(id: string) {
        return this.prisma.role.delete({
            where: { id },
        });
    }
}
