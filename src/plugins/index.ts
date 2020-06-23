import { IContext } from '../core/index';
import { ParamsPlugin } from './ParamsPlugin';
import { DataTypePlugin } from './DataTypePlugin';

export type Middleware = ( context: IContext, next: Function ) => Promise<void> | void;

export const DefaultPlugins: Middleware[] = [
    ParamsPlugin,
    DataTypePlugin
];