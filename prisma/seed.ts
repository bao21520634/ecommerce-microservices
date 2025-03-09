import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create base permissions
    const productPermissions = await createResourcePermissions('product');
    const orderPermissions = await createResourcePermissions('order');
    const userPermissions = await createResourcePermissions('user');
    const categoryPermissions = await createResourcePermissions('category');

    // Create roles
    await Promise.all([
        prisma.role.create({
            data: {
                name: 'admin',
                description: 'Administrator with full access',
                permissions: {
                    connect: [
                        ...productPermissions,
                        ...orderPermissions,
                        ...userPermissions,
                        ...categoryPermissions,
                    ].map((p) => ({ id: p.id })),
                },
            },
        }),
        prisma.role.create({
            data: {
                name: 'customer',
                description: 'Regular customer',
                permissions: {
                    connect: [
                        // Customers can read products and categories
                        productPermissions.find((p) => p.action === 'read')!,
                        categoryPermissions.find((p) => p.action === 'read')!,
                        // Customers can create and read their own orders
                        orderPermissions.find((p) => p.action === 'create')!,
                        orderPermissions.find((p) => p.action === 'read')!,
                    ].map((p) => ({ id: p.id })),
                },
            },
        }),
        prisma.role.create({
            data: {
                name: 'manager',
                description: 'Store manager',
                permissions: {
                    connect: [
                        // Managers can do everything with products and categories
                        ...productPermissions,
                        ...categoryPermissions,
                        // Managers can read and update orders
                        orderPermissions.find((p) => p.action === 'read')!,
                        orderPermissions.find((p) => p.action === 'update')!,
                        // Managers can read users
                        userPermissions.find((p) => p.action === 'read')!,
                    ].map((p) => ({ id: p.id })),
                },
            },
        }),
    ]);

    console.log('Database seeded with roles and permissions!');
}

async function createResourcePermissions(
    resource: string,
): Promise<{ id: string; action: string }[]> {
    const actions = ['create', 'read', 'update', 'delete'];
    const permissions: any = [];

    for (const action of actions) {
        const permission = await prisma.permission.create({
            data: {
                name: `${resource}:${action}`,
                description: `Can ${action} ${resource}`,
                resource,
                action,
            },
        });
        permissions.push(permission);
    }

    return permissions;
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
