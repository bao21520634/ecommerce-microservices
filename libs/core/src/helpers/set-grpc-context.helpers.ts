import { Metadata } from '@grpc/grpc-js';
import { GqlContext } from '../';

export function setRpcContext(ctx: GqlContext, inApp?: boolean): Metadata {
    const meta = new Metadata();
    meta.set('headers', JSON.stringify(ctx.req?.headers));

    if (inApp) {
        meta.set('inApp', inApp.toString());
    }
    return meta;
}
