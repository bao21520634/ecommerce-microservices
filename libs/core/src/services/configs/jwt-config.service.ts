import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get<string>(
                'app.auth.jwtSettings.secret',
                { infer: true },
            ),
            signOptions: {
                expiresIn: this.configService.get<string>(
                    'app.auth.jwtSettings.expiresIn',
                    '60m',
                ),
            },
        };
    }
}
