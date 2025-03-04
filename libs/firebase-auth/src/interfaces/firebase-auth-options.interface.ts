import { ModuleMetadata, Type } from '@nestjs/common';

export interface FirebaseAuthOptions {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

export interface FirebaseAuthOptionsFactory {
    createFirebaseAuthOptions():
        | FirebaseAuthOptions
        | Promise<FirebaseAuthOptions>;
}

export interface FirebaseAuthModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<FirebaseAuthOptionsFactory>;
    useClass?: Type<FirebaseAuthOptionsFactory>;
    useFactory?: (
        ...args: any[]
    ) => Promise<FirebaseAuthOptions> | FirebaseAuthOptions;
    inject?: any[];
}
