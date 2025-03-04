import { Module, DynamicModule, Provider, Global, Type } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import {
    FirebaseAuthModuleAsyncOptions,
    FirebaseAuthOptions,
    FirebaseAuthOptionsFactory,
} from './interfaces';
import { FIREBASE_AUTH_OPTIONS } from './constants';

@Global()
@Module({})
export class FirebaseAuthModule {
    static register(options: FirebaseAuthOptions): DynamicModule {
        const optionsProvider: Provider = {
            provide: FIREBASE_AUTH_OPTIONS,
            useValue: options,
        };

        return {
            module: FirebaseAuthModule,
            providers: [
                optionsProvider,
                FirebaseAuthService,
                FirebaseAuthGuard,
                FirebaseAuthStrategy,
            ],
            exports: [FirebaseAuthService, FirebaseAuthGuard],
        };
    }

    static registerAsync(
        options: FirebaseAuthModuleAsyncOptions,
    ): DynamicModule {
        const providers: Provider[] = this.createAsyncProviders(options);

        return {
            module: FirebaseAuthModule,
            imports: options.imports || [],
            providers: [
                ...providers,
                FirebaseAuthService,
                FirebaseAuthGuard,
                FirebaseAuthStrategy,
            ],
            exports: [FirebaseAuthService, FirebaseAuthGuard],
        };
    }

    private static createAsyncProviders(
        options: FirebaseAuthModuleAsyncOptions,
    ): Provider[] {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }

        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass as Type<FirebaseAuthOptionsFactory>,
                useClass: options.useClass as Type<FirebaseAuthOptionsFactory>,
            },
        ];
    }

    private static createAsyncOptionsProvider(
        options: FirebaseAuthModuleAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: FIREBASE_AUTH_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        return {
            provide: FIREBASE_AUTH_OPTIONS,
            useFactory: async (optionsFactory: FirebaseAuthOptionsFactory) =>
                await optionsFactory.createFirebaseAuthOptions(),
            inject: options.useExisting
                ? [options.useExisting]
                : options.useClass
                ? [options.useClass]
                : [],
        };
    }
}
