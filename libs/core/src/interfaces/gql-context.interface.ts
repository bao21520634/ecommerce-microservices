import { BaseContext } from '@apollo/server';
import {
    CartsRpcClientService,
    CatalogsRpcClientService,
    SearchsRpcClientService,
    SetupsRpcClientService,
} from '../services';
import { IncomingMessage } from 'http';

export interface GqlContext extends Partial<BaseContext> {
    req?: IncomingMessage;
    connection?: any;
    payload?: any;
    rpc: {
        catalog: CatalogsRpcClientService;
        cart: CartsRpcClientService;
        setup: SetupsRpcClientService;
        search: SearchsRpcClientService;
    };
}
