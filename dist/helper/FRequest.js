import { dealEnv } from '../helper/DealEnv';
export class FRequest {
    constructor(options, input, init) {
        /** 请求路径 */
        this.url = '';
        /** 公共路径 */
        this.baseUrl = '';
        // fetch({
        //     cache
        // })
        this.initialState(options, input, init);
    }
    initialState({ baseUrl }, input, init) {
        // common
        this.baseUrl = baseUrl || '';
        this.dataType = (init && init.dataType) || 'json';
        dealEnv({
            fetch: () => this.initialFetch(input, init),
            wechat: () => this.initialWeChat(input, init),
        });
    }
    initialFetch(input, init = {}) {
        let params;
        if (typeof input === 'string') {
            this.url = input;
            params = init;
            this.window = init.window;
        }
        if (input instanceof Request) {
            this.url = input.url;
            params = input;
        }
        const { credentials, integrity, keepalive, mode, redirect, referrer, referrerPolicy, signal, method, body, headers } = params;
        this.credentials = credentials;
        this.integrity = integrity;
        this.keepalive = keepalive;
        this.mode = mode;
        this.redirect = redirect;
        this.referrer = referrer;
        this.referrerPolicy = referrerPolicy;
        this.signal = signal;
        this.method = method || 'GET';
        this.body = body;
        this.headers = headers;
    }
    initialWeChat(url, options) {
        const { header, data, method } = options;
        this.url = url;
        this.headers = header;
        this.body = data;
        this.method = method || 'GET';
    }
}
//# sourceMappingURL=FRequest.js.map