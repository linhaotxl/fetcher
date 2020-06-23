import { dealEnv } from './DealEnv';
import { createFetchAdapter, createWxRequestAdapter } from '../adapters/index';
import { IContext } from '../core/index';

export const createAdapter = ( context: IContext ) => dealEnv({
    fetch: () => createFetchAdapter( context ),
    wechat: () => createWxRequestAdapter( context ),
});