import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductRepository } from '../../repositories';
import { Product } from '@ecommerce-microservices/proto-schema';
import { GetProductsQuery } from '../impl';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    constructor(private readonly productRepo: ProductRepository) {}

    async execute(data: GetProductsQuery): Promise<Product.Products> {
        try {
            const prismaQuery = this.productRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.productRepo.store.findMany({
                where: prismaQuery.where,
                skip: prismaQuery.skip,
                take: prismaQuery.take,
                orderBy: prismaQuery.orderBy,
            });

            return {
                products: result.map((product) => ({
                    ...product,
                    attributes: JSON.stringify(product.attributes),
                    variantAttributes: JSON.stringify(
                        product.variantAttributes,
                    ),
                })),
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
