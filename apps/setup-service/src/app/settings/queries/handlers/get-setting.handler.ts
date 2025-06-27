import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { SettingRepository } from '../../repositories';
import { GetSettingQuery } from '../impl';
import { Setting } from '@ecommerce-microservices/proto-schema';

@QueryHandler(GetSettingQuery)
export class GetSettingHandler implements IQueryHandler<GetSettingQuery> {
    constructor(private readonly settingRepo: SettingRepository) {}

    async execute(): Promise<Setting.Setting> {
        try {
            const result = await this.settingRepo.store.findFirst();

            return result;
        } catch (e) {
            console.log('e..........', e);
            throw new RpcException(e);
        }
    }
}
