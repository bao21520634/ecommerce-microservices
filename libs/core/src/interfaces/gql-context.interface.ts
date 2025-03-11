import { BaseContext } from '@apollo/server';
import { CatalogsRpcClientService, SearchsRpcClientService } from '../services';
import { IncomingMessage } from 'http';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export interface GqlContext extends Partial<BaseContext> {
    req?: IncomingMessage;
    connection?: any;
    payload?: any;
    rpc: {
        catalog: CatalogsRpcClientService;
        search: SearchsRpcClientService;
    };
    user?: DecodedIdToken | null;
}
