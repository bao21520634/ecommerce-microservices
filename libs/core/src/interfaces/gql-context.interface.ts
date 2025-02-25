import { BaseContext } from '@apollo/server';
import {
    AccountsRpcClientService,
    CatalogsRpcClientService,
} from '../services';
import { IncomingMessage } from 'http';

export interface GqlContext extends Partial<BaseContext> {
    req?: IncomingMessage;
    connection?: any;
    rpc: {
        account: AccountsRpcClientService;
        catalog: CatalogsRpcClientService;
    };
}
