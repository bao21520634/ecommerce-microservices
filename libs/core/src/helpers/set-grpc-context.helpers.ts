import { Metadata } from '@grpc/grpc-js';
import { GqlContext } from '../';

export function setRpcContext(ctx: GqlContext, inApp?: boolean): Metadata {
    const meta = new Metadata();
    if (ctx.req?.headers) {
        meta.set('headers', JSON.stringify(ctx.req.headers));
    } else {
        console.warn('Warning: ctx.req.headers is missing');
    }

    if (inApp) {
        meta.set('inApp', inApp.toString());
    }
    return meta;
}
