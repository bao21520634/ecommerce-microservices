import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { FirebaseAuthService } from '../firebase-auth.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
    Strategy,
    'firebase-auth',
) {
    constructor(private firebaseAuthService: FirebaseAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(token: string) {
        try {
            const decodedToken = await this.firebaseAuthService.verifyToken(
                token,
            );
            // You can enrich user data here if needed
            const user = await this.firebaseAuthService.getUser(
                decodedToken.uid,
            );
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                emailVerified: decodedToken.email_verified,
                roles: decodedToken['roles'] || [],
                claims: decodedToken,
                metadata: {
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                },
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
