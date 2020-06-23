import compose from '../utils/koa-compose';
import { DefaultPlugins } from '../plugins/index';
import { FRequest } from '../helper/FRequest';
import { createAdapter } from '../helper/CreateAdapter';
export class Fetcher {
    constructor(options) {
        this.middlewares = [];
        this.options = {
            baseUrl: ''
        };
        this.use(DefaultPlugins);
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
    use(middlewarea) {
        this.middlewares.push(...middlewarea);
    }
    // fetch ( input: RequestInfo, init?: RequestInit );
    // fetch ( input: RequestOption );
    fetch(input, init) {
        const context = this.createContext(input, init);
        const adapter = createAdapter(context);
        const middlewares = [...this.middlewares, adapter];
        // this.use([ adapter ]);
        const wrap = this.createMiddlewareWrap(middlewares);
        return wrap(context);
    }
    createContext(input, init) {
        const request = new FRequest(this.options, input, init);
        const response = null;
        return { request, response };
    }
    createMiddlewareWrap(middlewares) {
        return compose(middlewares);
    }
}
//# sourceMappingURL=Fetcher.js.map