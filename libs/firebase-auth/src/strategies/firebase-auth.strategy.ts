import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseAuthService } from '../services';
import { PrismaClient } from '@prisma/client';
import { DEFAULT_USER } from '../constants';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
    Strategy,
    'firebase-auth',
) {
    constructor(
        private firebaseAuthService: FirebaseAuthService,
        private prisma: PrismaClient,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(token: string) {
        try {
            const decodedToken = await this.firebaseAuthService.verifyToken(
                token,
            );

            const firebaseUser = await this.firebaseAuthService.getUser(
                decodedToken.uid,
            );

            let user = await this.prisma.user.findUnique({
                where: { firebaseUid: decodedToken.uid },
                include: {
                    roles: {
                        include: {
                            permissions: true,
                        },
                    },
                },
            });

            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        firebaseUid: decodedToken.uid,
                        metadata: {
                            firebaseCreationTime:
                                firebaseUser.metadata.creationTime,
                            firebaseLastSignInTime:
                                firebaseUser.metadata.lastSignInTime,
                        },
                        roles: {
                            connectOrCreate: {
                                where: { name: DEFAULT_USER },
                                create: {
                                    name: DEFAULT_USER,
                                },
                            },
                        },
                    },
                    include: {
                        roles: {
                            include: {
                                permissions: true,
                            },
                        },
                    },
                });
            }

            const roles = user.roles.map((role: any) => role.name);
            const permissions = user.roles.flatMap((role: any) =>
                role.permissions.map((permission: any) => ({
                    resource: permission.resource,
                    action: permission.action,
                })),
            );

            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                emailVerified: decodedToken.email_verified,
                firebaseClaims: decodedToken,
                roles,
                permissions,
                databaseId: user.id,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
