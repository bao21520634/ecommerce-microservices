import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PermissionService {
    constructor(private prisma: PrismaClient) {}

    async findAll() {
        return this.prisma.permission.findMany();
    }

    async findOne(id: string) {
        return this.prisma.permission.findUnique({
            where: { id },
        });
    }

    async findByName(name: string) {
        return this.prisma.permission.findUnique({
            where: { name },
        });
    }

    async findByResourceAction(resource: string, action: string) {
        return this.prisma.permission.findFirst({
            where: {
                resource,
                action,
            },
        });
    }

    async create(data: {
        name: string;
        description?: string;
        resource: string;
        action: string;
    }) {
        return this.prisma.permission.create({
            data,
        });
    }

    async update(
        id: string,
        data: {
            name?: string;
            description?: string;
            resource?: string;
            action?: string;
        },
    ) {
        return this.prisma.permission.update({
            where: { id },
            data,
        });
    }

    async delete(id: string) {
        return this.prisma.permission.delete({
            where: { id },
        });
    }
}
