var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FResponse } from '../helper/FResponse';
export const createFetchAdapter = () => {
    return (context, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { request: { url, body, credentials, headers, redirect, referrer, referrerPolicy, signal, window, keepalive, integrity, method, mode, cache } } = context;
        const res = yield fetch(url, {
            credentials,
            body: body,
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
        context.response = new FResponse(res);
        yield next();
    });
};
//# sourceMappingURL=FetchAdapter.js.map