import {
    FirebaseAuthOptions,
    FirebaseAuthOptionsFactory,
} from '@ecommerce-microservices/firebase-auth';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseAuthConfigService implements FirebaseAuthOptionsFactory {
    private readonly logger = new Logger(FirebaseAuthConfigService.name);

    constructor(private readonly configService: ConfigService) {}

    createFirebaseAuthOptions():
        | FirebaseAuthOptions
        | Promise<FirebaseAuthOptions> {
        const firebase =
            this.configService.get<FirebaseAuthOptions>('firebase');

        if (!firebase) {
            this.logger.error('Firebase configuration not found');
            throw new Error('Firebase configuration not found');
        }

        this.logger.log(
            `Configuring Firebase Auth for project: ${firebase.projectId}`,
        );

        return firebase;
    }
}
