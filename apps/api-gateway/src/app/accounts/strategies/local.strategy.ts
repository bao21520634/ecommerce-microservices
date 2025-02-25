import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GraphQLLocalStrategy } from 'graphql-passport';
import { AccountService } from '../account.service';
import { Auth } from '@ecommerce-microservices/proto-schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(GraphQLLocalStrategy) {
    constructor(private readonly accountService: AccountService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        if (email && password) {
            const user = await this.accountService.validateUser({
                service: Auth.LoginServiceTypes.Password,
                params: {
                    password,
                    email,
                    accessToken: undefined,
                    userId: undefined,
                },
            });

            if (!user) {
                throw new UnauthorizedException();
            }
            return user;
        }
        throw new UnauthorizedException();
    }
}
