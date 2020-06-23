import { IContext } from '../core/index';
import { Middleware } from '../plugins/index';

export * from './FetchAdapter';
export * from './WxRequestAdapter';

export type Adapter = ( context: IContext ) => Middleware;