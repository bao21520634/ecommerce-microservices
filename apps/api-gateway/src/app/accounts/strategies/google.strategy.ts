import { PassportStrategy } from '@nestjs/passport';
import {
    Injectable,
    Logger,
    NotImplementedException,
    UnauthorizedException,
} from '@nestjs/common';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { AccountService } from '../account.service';
import { ConfigService } from '@nestjs/config';
import { Auth, User } from '@ecommerce-microservices/proto-schema';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    logger = new Logger(this.constructor.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly accountService: AccountService,
    ) {
        super({
            clientID: configService.get<string>(
                'auth.strategies.google.clientID',
            ),
            clientSecret: configService.get<string>(
                'auth.strategies.google.clientSecret',
            ),
            callbackURL: configService.get<string>(
                'auth.strategies.google.callbackURL',
            ),
            scope: ['profile', 'email'],
        } as StrategyOptions);
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
    ): Promise<any> {
        if (profile && profile.emails.length > 0) {
            const fullName = profile.displayName;

            const logCmd: Auth.LoginRequest = {
                service: Auth.LoginServiceTypes.Google,
                params: {
                    accessToken,
                    userId: profile.id,
                    email: profile.emails[0].value,
                    password: undefined,
                },
            };

            const regCmd: User.CreateRequest = {
                service: Auth.LoginServiceTypes.Google,
                tokens: {
                    accessToken,
                    userId: profile.id,
                },
                email: profile.emails[0].value,
                fullName: fullName,
                password: undefined,
                username:
                    profile.username ?? profile.emails[0].value.split('@')[0],
            };

            const user = await this.accountService.validateOrCreateUser(
                logCmd,
                regCmd,
            );

            if (!user) {
                throw new UnauthorizedException();
            }
            return user;
        }
        throw new NotImplementedException();
    }
}
