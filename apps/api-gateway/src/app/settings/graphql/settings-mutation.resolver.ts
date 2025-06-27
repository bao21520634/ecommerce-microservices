import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlContext, setRpcContext } from '@ecommerce-microservices/core';
import { lastValueFrom } from 'rxjs';
import { Setting as SettingDto } from './entity/settings.entity';
import { UpdateOneSettingArgs } from './dtos/update-one-setting.args';

@Resolver(() => SettingDto)
export class SettingsMutationResolver {
    @Mutation(() => SettingDto, { nullable: true })
    async updateSetting(
        @Context() context: GqlContext,
        @Args() input: UpdateOneSettingArgs,
    ): Promise<SettingDto> {
        const grpcContext = setRpcContext(context);

        const { id, data } = input;

        const result = await lastValueFrom(
            context.rpc.setup.svc.updateSetting({ id, data }, grpcContext),
        );

        return result as SettingDto;
    }
}
