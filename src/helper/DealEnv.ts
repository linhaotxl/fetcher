export type DEAL_TYPE<R> = {
    fetch: () => R;
    wechat: () => R;
};

export const dealEnv = <R = void>( params: DEAL_TYPE<R> ): R => {
    if ( typeof fetch === 'function' ) {
        return params.fetch();
    }
    if ( typeof wx === 'object' && wx !== null ) {
        return params.wechat();
    }
}