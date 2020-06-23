import { dealEnv } from '../helper/DealEnv';
import { IFetcherOptions, IFetcherExtOptions } from '../core/index';

export class FRequest {
    /** 请求路径 */
    url: string = '';
    /** 公共路径 */
    baseUrl?: string = '';
    /** 请求体 */
    body?: BodyInit | WxRequestData;
    /** 请求头 */
    headers?: HeadersInit;
    /** 超时时间 */
    timeout?: number;
    /** 请求方法 */
    method?: string;
    /** 数据响应类型 */
    dataType?: FetchDataType | WxDataType;
    
    responseType?: WxResponseType;
    credentials?: RequestCredentials;
    integrity?: string;
    keepalive?: boolean;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: any;
    cache?: RequestCache;

    constructor (
        options: IFetcherOptions,
        input: RequestInfo,
        init?: (RequestInit | WxRequestOption) & IFetcherExtOptions
    ) {
        // fetch({
        //     cache
        // })
        this.initialState( options, input, init );
    }

    initialState (
        { baseUrl }: IFetcherOptions,
        input: RequestInfo,
        init: (RequestInit | WxRequestOption) & IFetcherExtOptions
    ) {
        // common
        this.baseUrl = baseUrl || '';
        this.dataType = (init && init.dataType) || 'json';

        dealEnv({
            fetch: () => this.initialFetch( input, init as RequestInit ),
            wechat: () => this.initialWeChat( input as string, init as Omit<WxRequestOption, 'url'> ),
        });
    }

    initialFetch ( input: RequestInfo, init: RequestInit = {} ) {
        let params: Request | RequestInit;
        if ( typeof input === 'string' ) {
            this.url = input;
            params = init;
            this.window = init.window;
        }
        if ( input instanceof Request ) {
            this.url = input.url;
            params = input as Request;
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
        this.method = method as any || 'GET';
        this.body = body;
        this.headers = headers;
    }

    initialWeChat ( url: string, options: Omit<WxRequestOption, 'url'> ) {
        const { header, data, method } = options;
        this.url = url;
        this.headers = header;
        this.body = data;
        this.method = method || 'GET';
    }
}