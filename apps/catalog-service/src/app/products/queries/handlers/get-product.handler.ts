import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { ProductRepository } from '../../repositories';
import { GetProductQuery } from '../impl';
import { Product } from '@ecommerce-microservices/proto-schema';

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
