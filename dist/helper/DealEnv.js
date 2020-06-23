export const dealEnv = (params) => {
    if (typeof fetch === 'function') {
        return params.fetch();
    }
    if (typeof wx === 'object' && wx !== null) {
        return params.wechat();
    }
};
//# sourceMappingURL=DealEnv.js.map