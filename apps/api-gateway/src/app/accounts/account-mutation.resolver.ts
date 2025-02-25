import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import {
    Account,
    AccountMutations,
    AccountRegisterResponse,
    BooleanPayload,
    ExpirableTokens,
    LoginInput,
    RegisterInput,
    VerificationLinkInfo,
} from './types';
import { Logger } from '@nestjs/common';
import { GqlContext } from '@ecommerce-microservices/core';
import { AuthServiceTypes, User as PrismaUser } from '@prisma/client';
import { IdentifyMachineUtils } from '@ecommerce-microservices/common';
import { Auth, User } from '@ecommerce-microservices/proto-schema';
import { from, Observable } from 'rxjs';

@Resolver(() => AccountMutations)
export class AccountsMutationResolver {
    logger = new Logger(this.constructor.name);

    @ResolveField(() => Account)
    async login(
        @Args('input') { service, params }: LoginInput,
        @Context() ctx: GqlContext,
    ): Promise<Account> {
        const validationErrors = {};
        if (!service) {
            validationErrors[service] = 'MISSING_VALUE';
            this.logger.error('Missing user login service type');
            return null;
        }
        const serviceType: AuthServiceTypes =
            AuthServiceTypes[service as unknown as string];
        this.logger.log(serviceType);

        if (serviceType === AuthServiceTypes.PASSWORD) {
            if (!params.password || !params.email) {
                validationErrors[params.password || params.email] =
                    'MISSING_VALUE';
                this.logger.error('Missing user login password or email');
                return null;
            }
        } else {
            if (!params.accessToken || !params.accessTokenSecret) {
                validationErrors[
                    params.accessToken || params.accessTokenSecret
                ] = 'MISSING_VALUE';
                this.logger.error(
                    `Missing user access token or secret for ${service
                        .toString()
                        .toLowerCase()} strategy`,
                );
                return null;
            }
        }

        if (serviceType === AuthServiceTypes.PASSWORD) {
            const auth = await ctx.authenticate('graphql-local', {
                email: params.email,
                password: params.password,
            } as any);
            (auth.user as any).whoImI = new IdentifyMachineUtils(
                ctx.req,
            ).sender();
            ctx.login(auth.user);

            return {
                id: auth.user.id.toString(),
                user: auth.user as unknown as PrismaUser,
            };
        }

        this.logger.error('This login service has not been implemented yet');
        return null;
    }

    @ResolveField(() => AccountRegisterResponse)
    register(
        @Args('input') cmd: RegisterInput,
        @Context() ctx: GqlContext,
    ): Observable<AccountRegisterResponse> {
        const payload = {
            ...cmd,
            service: Auth.LoginServiceTypes.Password,
        };

        return from(
            ctx?.rpc?.account?.svc.CreateUser(
                ctx,
                User.CreateRequest.fromJSON(payload),
            ),
        );
    }

    @ResolveField(() => BooleanPayload)
    sendResetPasswordEmail(
        @Args('email') email: string,
        @Context() ctx: GqlContext,
    ): Observable<BooleanPayload> {
        return from(
            ctx?.rpc?.account?.svc.ForgotPassword(ctx, {
                email,
            }),
        );
    }

    @ResolveField(() => BooleanPayload)
    sendVerificationEmail(
        @Args('email') email: string,
        @Context() ctx: GqlContext,
    ): Observable<BooleanPayload> {
        return from(
            ctx?.rpc?.account?.svc.ResendVerificationCode(ctx, { email }),
        );
    }

    @ResolveField(() => BooleanPayload)
    changePassword(
        @Args('oldPassword') oldPassword: string,
        @Args('newPassword') newPassword: string,
        @Args('newPasswordConfirm') newPasswordConfirm: string,
        @Context() ctx: GqlContext,
    ): Observable<BooleanPayload> {
        this.logger.error('Not implemented');
        return null;
    }

    @ResolveField(() => Account)
    refreshTokens(
        @Args('accessToken') accessToken: string,
        @Args('refreshToken') refreshToken: string,
        @Context() ctx: GqlContext,
    ): Observable<Account> {
        this.logger.error('Not implemented');
        return null;
    }

    @ResolveField(() => BooleanPayload)
    verifyAccount(
        @Args('verificationCode') verificationCode: string,
        @Args('email') email: string,
        @Context() ctx: GqlContext,
    ): Observable<BooleanPayload> {
        return from(
            ctx?.rpc?.account?.svc.VerifyAccount(ctx, {
                verificationCode,
                email,
            }),
        );
    }

    @ResolveField(() => ExpirableTokens)
    verifyExpireToken(
        @Args('token') token: number,
        @Args('token') email: string,
        @Context() ctx: GqlContext,
    ): Observable<ExpirableTokens> {
        this.logger.error('Not implemented');
        return null;
    }

    @ResolveField(() => VerificationLinkInfo)
    verifyActivationLink(
        @Args('token') token: string,
        @Args('token') email: string,
        @Context() ctx: GqlContext,
    ): Observable<VerificationLinkInfo> {
        return from(
            ctx?.rpc?.account?.svc.VerifyActivationLink(ctx, {
                token,
            }),
        );
    }

    @ResolveField(() => BooleanPayload)
    async logout(@Context() context: any) {
        try {
            await context.logout();
            return {
                success: true,
            };
        } catch (e) {
            this.logger.error('Logout failed', e);
            return {
                success: false,
            };
        }
    }
}
