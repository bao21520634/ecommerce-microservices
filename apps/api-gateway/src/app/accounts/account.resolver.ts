import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Account, AccountMutations } from './types';

@Resolver(() => Account)
export class AccountResolver {
    logger = new Logger(this.constructor.name);

    @Mutation(() => AccountMutations, { nullable: true })
    account(@Context() context: any) {
        // Magic
        return {};
    }

    @Query(() => String)
    placeholderQuery() {
        return 'This is a placeholder query';
    }
}
