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
                name: 'vendor',
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

    const category = await prisma.category.create({
        data: {
            name: 'Electronics',
            slug: 'electronics',
            shortDescription: 'Electronic devices and gadgets',
        },
    });

    await createSampleProducts(category.id);
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

async function createSampleProducts(categoryId: string) {
    const products = [
        {
            id: '67d6f9bbe17e94953eb6c07c',
            name: 'iPhone 15 Pro',
            slug: 'iphone-15-pro',
            brand: 'Apple',
            shortDescription: 'Latest iPhone with A17 chip',
            longDescription:
                'The iPhone 15 Pro features an A17 Pro chip, a titanium frame, and an improved camera system.',
            manufacturerId: 'apple',
            metaKeywords: 'iPhone, Apple, Smartphone',
            tags: ['smartphone', 'apple', 'iphone'],
            priceExclTax: 999,
            priceInclTax: 1099,
            stockAvailability: 50,
            attributes: {
                color: 'Black',
                storage: '256GB',
            },
            variantAttributes: null,
        },
        {
            id: '67d6f9c3c86999df6e876741',
            name: 'Samsung Galaxy S24 Ultra',
            slug: 'samsung-galaxy-s24-ultra',
            brand: 'Samsung',
            shortDescription: 'Powerful flagship with S Pen support',
            longDescription:
                'The Samsung Galaxy S24 Ultra is packed with the latest Snapdragon chip, an advanced camera, and a stunning AMOLED display.',
            manufacturerId: 'samsung',
            metaKeywords: 'Samsung, Galaxy, Smartphone',
            tags: ['smartphone', 'samsung', 'galaxy'],
            priceExclTax: 1199,
            priceInclTax: 1299,
            stockAvailability: 40,
            attributes: {
                color: 'Phantom Black',
                storage: '512GB',
            },
            variantAttributes: null,
        },
    ];

    await prisma.product.createMany({
        data: products,
    });

    await prisma.productCategory.createMany({
        data: products.map((product) => ({
            productId: product.id,
            categoryId: categoryId,
        })),
    });

    console.log('Sample products added!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
