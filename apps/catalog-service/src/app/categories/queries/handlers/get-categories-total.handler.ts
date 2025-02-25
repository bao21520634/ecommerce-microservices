import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { CategoryRepository } from '../../repositories';
import { Common } from '@ecommerce-microservices/proto-schema';
import { GetCategoriesTotalQuery } from '../impl';

@QueryHandler(GetCategoriesTotalQuery)
export class GetCategoriesTotalHandler
    implements IQueryHandler<GetCategoriesTotalQuery>
{
    constructor(private readonly categoryRepo: CategoryRepository) {}

    async execute(data: GetCategoriesTotalQuery): Promise<Common.Count> {
        try {
            const prismaQuery = this.categoryRepo.fromQueryGrpcToPrisma(
                data?.query,
            );

            const result = await this.categoryRepo.store.count({
                where: prismaQuery.where,
            });

            return {
                totalCount: result,
            };
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
