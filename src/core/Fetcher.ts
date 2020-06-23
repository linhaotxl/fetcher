import compose from '../utils/koa-compose';
import { Middleware, DefaultPlugins } from '../plugins/index';
import { FRequest } from '../helper/FRequest';
import { FResponse } from '../helper/FResponse';
import { createAdapter } from '../helper/CreateAdapter';

export interface IFetcherOptions {
    baseUrl: string;
}

export interface IFetcherExtOptions {
    dataType?: FetchDataType | WxDataType;
}

export interface IContext {
    request: FRequest;
    response: FResponse | null;
}

export class Fetcher {

    private middlewares: Middleware[] = [];
    options: IFetcherOptions = {
        baseUrl: ''
    };

    constructor ( options: Partial<IFetcherOptions> ) {
        this.use( DefaultPlugins );
        this.options = { ...this.options, ...options };
    }

    use ( middlewarea: Middleware[] ) {
        this.middlewares.push( ...middlewarea );
    }

    // fetch ( input: RequestInfo, init?: RequestInit );
    // fetch ( input: RequestOption );
    fetch ( input: RequestInfo, init?: (RequestInit | WxRequestOption) & IFetcherExtOptions ) {
        const context = this.createContext( input, init );
        const adapter = createAdapter( context );
        const middlewares = [ ...this.middlewares, adapter ];
        // this.use([ adapter ]);

        const wrap = this.createMiddlewareWrap( middlewares );
        return wrap( context );
    }

    createContext ( input: RequestInfo, init?: (RequestInit | WxRequestOption) & IFetcherExtOptions ): IContext {
        const request = new FRequest( this.options, input, init );
        const response: FResponse = null;
        return { request, response };
    }

    createMiddlewareWrap ( middlewares: Middleware[] ) {
        return compose( middlewares )
    }

}