import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken } from '@clerk/backend';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class ClerkAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true;
        }

        const rpcContext = context.switchToRpc();
        const metadata = rpcContext.getContext();

        // Get token from metadata
        const token = metadata.get('authorization')?.[0]?.split(' ')?.[1];

        if (!token) {
            throw new RpcException({
                code: 16, // UNAUTHENTICATED in gRPC
                message: 'Authentication required',
            });
        }

        // Verify token with Clerk
        return this.validateToken(token);
    }

    private async validateToken(token: string): Promise<boolean> {
        try {
            // Verify JWT using the new @clerk/backend library
            const { payload } = await verifyToken(token, {
                secretKey: process.env['CLERK_SECRET_KEY'],
            });

            if (!payload) {
                throw new RpcException({
                    code: 16, // UNAUTHENTICATED in gRPC
                    message: 'Invalid token',
                });
            }

            return true;
        } catch (error) {
            throw new RpcException({
                code: 16, // UNAUTHENTICATED in gRPC
                message: error,
            });
        }
    }
}
