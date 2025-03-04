import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase-auth') {
    override getRequest(context: ExecutionContext) {
        // For GraphQL
        if (context.getType().toString() === 'graphql') {
            const ctx = GqlExecutionContext.create(context);
            const request = ctx.getContext().req;
            return request;
        }
        // For REST
        return context.switchToHttp().getRequest();
    }

    override handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err;
        }
        return user;
    }
}
