import { Middleware } from './index';
import { dealEnv } from '../helper/DealEnv';

const APPLICATION_JSON = 'application/json';
const APPLICATION_FORM = 'application/x-www-form-urlencoded';

export const ParamsPlugin: Middleware = async ( context, next ) => {
    const { request } = context;
    const { headers, method, body } = request;

    // 解析 body
    const normalizeBody = dealEnv<string>({
        wechat: () => resolveWeChatBody( headers, body ),
        fetch: () => resolveFetchBody( headers, body )
    });

    request.url  = request.baseUrl + request.url;
    request.body = normalizeBody;

    return await next();
}

const resolveParams = ( body: any, contentType: string ) => {
    if ( contentType.includes( APPLICATION_JSON ) ) {
        return resolveJSONParams( body );
    }
    if ( body && typeof body === 'object' ) {
        return resolveFormDataParams( body );
    }
    if ( typeof body === 'string' ) {
        return body;
    }

    return '';
}

const resolveJSONParams = ( body: any ) => JSON.stringify( body );

const resolveFormDataParams = ( data: object ) => {
    const body: string[] = Object.entries( data ).map(([ key, value ]) => `${key}=${value}` );
    return body.join( '&' );
}

const resolveFetchBody = ( headers: HeadersInit, body: any ) => {
    if ( headers instanceof Headers && headers.has( 'Content-Type' ) ) {
        return resolveParams( body, headers.get( 'Content-Type' ) );
    }

    let h = headers as Record<string, string>;
    if (
        h && 
        typeof h === 'object' &&
        (h['Content-Type'] ||
        h['content-type'])
    ) {
        return resolveParams( body, h['Content-Type'] || h['content-type'] || '' );
    }

    // return body;
}

const resolveWeChatBody = ( headers: HeadersInit, body: any ) => {
    const h = headers as Record<string, string>;
    if (
        h &&
        (h['Content-Type'] || 
        h['content-type'])
    ) {
        return resolveParams( body, h['Content-Type'] || h['content-type'] || '' );
    }
}