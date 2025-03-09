import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredPermission = this.reflector.get<{
            resource: string;
            action: string;
        }>('permission', context.getHandler());

        if (!requiredPermission) {
            return true;
        }

        let request;
        if (context.getType().toString() === 'graphql') {
            const ctx = GqlExecutionContext.create(context);
            request = ctx.getContext().req;
        } else {
            request = context.switchToHttp().getRequest();
        }

        const user = request.user;

        if (!user || !user.permissions) {
            throw new ForbiddenException(
                'User not authenticated or missing permissions',
            );
        }

        const hasPermission = user.permissions.some(
            (permission: any) =>
                permission.resource === requiredPermission.resource &&
                permission.action === requiredPermission.action,
        );

        if (!hasPermission) {
            throw new ForbiddenException(
                `Required permission: ${requiredPermission.resource}:${requiredPermission.action}`,
            );
        }

        return true;
    }
}
