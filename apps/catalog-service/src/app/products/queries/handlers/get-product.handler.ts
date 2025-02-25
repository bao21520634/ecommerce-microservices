import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductRepository } from '../../repositories';
import { GetProductQuery } from '../impl';
import { Product } from '@ecommerce-microservices/proto-schema';
import {
    ProductType as PrismaProductType,
    ProductStatus as PrismaProductStatus,
} from '@prisma/client';
import { mapEnum } from '@ecommerce-microservices/common';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
    constructor(private readonly productRepo: ProductRepository) {}

    async execute(query: GetProductQuery): Promise<Product.NullableProduct> {
        try {
            const result = await this.productRepo.store.findFirst({
                where: {
                    id: query.id,
                },
            });

            return {
                data: result
                    ? {
                          ...result,
                          productType: mapEnum(
                              Product.ProductType,
                              PrismaProductType,
                              result.productType,
                          ),
                          status: mapEnum(
                              Product.ProductStatus,
                              PrismaProductStatus,
                              result.status,
                          ),
                          attributes: JSON.stringify(result.attributes),
                          variantAttributes: JSON.stringify(
                              result.variantAttributes,
                          ),
                      }
                    : undefined,
                null: result ? 0 : undefined,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
