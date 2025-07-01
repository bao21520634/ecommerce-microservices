import { Context, Query, Resolver } from '@nestjs/graphql';
import { Setting as SettingDto } from './entity/settings.entity';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';

@Resolver(() => SettingDto)
export class SettingsResolver {
    @Query(() => SettingDto, { nullable: true })
    async setting(@Context() context: GqlContext): Promise<SettingDto> {
        const grpcContext = setRpcContext(context);

        const result = await lastValueFrom(
            context.rpc.setup.svc.setting({}, grpcContext),
        );

        return result as SettingDto;
    }
}
