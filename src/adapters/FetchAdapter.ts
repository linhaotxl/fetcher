import { FResponse } from '../helper/FResponse';
import { Adapter } from './index';

export const createFetchAdapter: Adapter = () => {
    return async ( context, next ) => {
        const { request: { url, body, credentials, headers, redirect, referrer, referrerPolicy, signal, window, keepalive, integrity, method, mode, cache } } = context;

        const res = await fetch( url, {
            credentials,
            body: body as BodyInit,
            cache,
            headers,
            redirect,
            referrer,
            referrerPolicy,
            window,
            signal,
            keepalive,
            integrity,
            method,
            mode
        });

        context.response = new FResponse( res );
        
        await next();
    }
}