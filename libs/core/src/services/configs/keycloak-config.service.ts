import { KeycloakConfig } from '@ecommerce-microservices/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    KeycloakConnectOptions,
    KeycloakConnectOptionsFactory,
    PolicyEnforcementMode,
    TokenValidation,
} from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createKeycloakConnectOptions(): KeycloakConnectOptions {
        const keycloak = this.configService.get<KeycloakConfig>('keycloak');

        return {
            authServerUrl: keycloak?.authServerUrl,
            realm: keycloak?.realm,
            clientId: keycloak?.clientId,
            secret: keycloak?.secret || '',
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
            tokenValidation: TokenValidation.ONLINE,
        };
    }
}
