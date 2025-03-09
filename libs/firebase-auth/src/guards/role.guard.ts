import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );

        if (!requiredRoles || requiredRoles.length === 0) {
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

        if (!user || !user.roles) {
            throw new ForbiddenException(
                'User not authenticated or missing roles',
            );
        }

        const hasRole = requiredRoles.some((role) => user.roles.includes(role));

        if (!hasRole) {
            throw new ForbiddenException(
                `Required roles: ${requiredRoles.join(', ')}`,
            );
        }

        return true;
    }
}
