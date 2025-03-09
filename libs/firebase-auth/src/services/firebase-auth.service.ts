import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseAuthOptions } from '../interfaces/firebase-auth-options.interface';
import { FIREBASE_AUTH_OPTIONS } from '../constants';

@Injectable()
export class FirebaseAuthService {
    private firebaseApp: admin.app.App;

    constructor(
        @Inject(FIREBASE_AUTH_OPTIONS)
        private options: FirebaseAuthOptions,
    ) {
        // Initialize Firebase Admin SDK
        this.firebaseApp = admin.initializeApp(
            {
                credential: admin.credential.cert({
                    projectId: this.options.projectId,
                    clientEmail: this.options.clientEmail,
                    privateKey: this.options.privateKey.replace(/\\n/g, '\n'),
                }),
            },
            'firebaseAuthApp',
        );
    }

    async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
        try {
            const decodedToken = await this.firebaseApp
                .auth()
                .verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            throw new UnauthorizedException('Invalid Firebase token');
        }
    }

    async getUser(uid: string): Promise<admin.auth.UserRecord> {
        try {
            return await this.firebaseApp.auth().getUser(uid);
        } catch (error) {
            throw new UnauthorizedException('User not found');
        }
    }

    async createUser(
        userData: admin.auth.CreateRequest,
    ): Promise<admin.auth.UserRecord> {
        try {
            return await this.firebaseApp.auth().createUser(userData);
        } catch (error) {
            throw new Error(`Failed to create user: ${error}`);
        }
    }

    async updateUser(
        uid: string,
        userData: admin.auth.UpdateRequest,
    ): Promise<admin.auth.UserRecord> {
        try {
            return await this.firebaseApp.auth().updateUser(uid, userData);
        } catch (error) {
            throw new Error(`Failed to update user: ${error}`);
        }
    }

    async deleteUser(uid: string): Promise<void> {
        try {
            await this.firebaseApp.auth().deleteUser(uid);
        } catch (error) {
            throw new Error(`Failed to delete user: ${error}`);
        }
    }
}
