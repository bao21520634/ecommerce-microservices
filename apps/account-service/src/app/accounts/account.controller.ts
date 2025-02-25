import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { LoginUserCommand, UpdateUserCommand } from './commands';
import { GetUserQuery } from './queries';

import {
    User,
    Auth,
    AccountService,
} from '@ecommerce-microservices/proto-schema';
import { RegisterUserCommand } from './commands/impl/register.user.command';
import { ResendVerificationEmailCommand } from './commands/impl/resend-verification-email.command';
import { UpdateUserPasswordCommand } from './commands/impl/update-user-password.command';
import { VerifyEmailCommand } from './commands/impl/verify-email.command';
import { ForgotPasswordCommand } from './commands/impl/forgot-password.command';

@Controller('accounts')
export class AccountController implements AccountService.AccountService<any> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly jwtService: JwtService,
    ) {}

    @GrpcMethod('AccountService', 'CreateUser')
    async CreateUser(
        ctx: any,
        request: User.CreateRequest,
    ): Promise<User.CreateResponse> {
        console.log('Received request:', request);

        return await this.commandBus.execute(new RegisterUserCommand(request));
    }

    @GrpcMethod('AccountService', 'ReadUser')
    async ReadUser(
        ctx: any,
        request: User.ReadRequest,
    ): Promise<User.ReadResponse> {
        if (!request.query) {
            throw new RpcException('Missing query params');
        }
        const user = (await this.queryBus.execute(
            new GetUserQuery(JSON.parse(request.query)),
        )) as User.User;
        return {
            user,
        };
    }

    @GrpcMethod('AccountService', 'UpdateUser')
    async UpdateUser(
        ctx: any,
        request: User.UpdateRequest,
    ): Promise<User.UpdateResponse> {
        return await this.commandBus.execute(
            new UpdateUserCommand(null, request),
        );
    }

    @GrpcMethod('AccountService', 'DeleteUser')
    DeleteUser(
        ctx: any,
        request: User.DeleteRequest,
    ): Promise<User.DeleteResponse> {
        return undefined;
    }

    @GrpcMethod('AccountService', 'SearchUser')
    SearchUser(
        ctx: any,
        request: User.SearchRequest,
    ): Promise<User.SearchResponse> {
        return undefined;
    }

    @GrpcMethod('AccountService', 'Login')
    async Login(
        ctx: any,
        request: Auth.LoginRequest,
    ): Promise<Auth.LoginResponse> {
        return await this.commandBus.execute(new LoginUserCommand(request));
    }

    @GrpcMethod('AccountService', 'Logout')
    Logout(
        ctx: any,
        request: Auth.LogoutRequest,
    ): Promise<Auth.LogoutResponse> {
        return undefined;
    }

    @GrpcMethod('AccountService', 'ReadSession')
    ReadSession(
        ctx: any,
        request: Auth.ReadSessionRequest,
    ): Promise<Auth.ReadSessionResponse> {
        return undefined;
    }

    @GrpcMethod('AccountService', 'VerifyAccount')
    async VerifyAccount(
        ctx: any,
        request: Auth.VerifyAccountRequest,
    ): Promise<Auth.VerifyAccountResponse> {
        return await this.commandBus.execute(
            new VerifyEmailCommand(request.verificationCode, request.email),
        );
    }

    @GrpcMethod('AccountService', 'ResendVerificationCode')
    async ResendVerificationCode(
        ctx: any,
        request: Auth.ResendVerificationCodeRequest,
    ): Promise<Auth.ResendVerificationCodeResponse> {
        return await this.commandBus.execute(
            new ResendVerificationEmailCommand(request.email),
        );
    }

    @GrpcMethod('AccountService', 'VerifyActivationLink')
    async VerifyActivationLink(
        ctx: any,
        request: Auth.VerifyActivationLinkRequest,
    ): Promise<Auth.VerifyActivationLinkResponse> {
        try {
            const decoded = (await this.jwtService.decode(
                request.token,
            )) as any;
            return {
                email: decoded.email,
                verificationCode: decoded.verificationCode,
            };
        } catch (e) {
            throw new RpcException(e);
        }
    }

    @GrpcMethod('AccountService', 'ForgotPassword')
    async ForgotPassword(
        ctx: any,
        request: Auth.ForgotPasswordRequest,
    ): Promise<Auth.ForgotPasswordResponse> {
        return await this.commandBus.execute(
            new ForgotPasswordCommand(request),
        );
    }

    @GrpcMethod('AccountService', 'UpdatePassword')
    async UpdatePassword(
        ctx: any,
        request: Auth.UpdatePasswordRequest,
    ): Promise<Auth.UpdatePasswordResponse> {
        return await this.commandBus.execute(
            new UpdateUserPasswordCommand(request),
        );
    }
}
