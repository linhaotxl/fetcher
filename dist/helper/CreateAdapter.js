import { dealEnv } from './DealEnv';
import { createFetchAdapter, createWxRequestAdapter } from '../adapters/index';
export const createAdapter = (context) => dealEnv({
    fetch: () => createFetchAdapter(context),
    wechat: () => createWxRequestAdapter(context),
});
//# sourceMappingURL=CreateAdapter.js.map