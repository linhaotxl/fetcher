var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dealEnv } from '../helper/DealEnv';
const APPLICATION_JSON = 'application/json';
const APPLICATION_FORM = 'application/x-www-form-urlencoded';
export const ParamsPlugin = (context, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { request } = context;
    const { headers, method, body } = request;
    // 解析 body
    const normalizeBody = dealEnv({
        wechat: () => resolveWeChatBody(headers, body),
        fetch: () => resolveFetchBody(headers, body)
    });
    request.url = request.baseUrl + request.url;
    request.body = normalizeBody;
    return yield next();
});
const resolveParams = (body, contentType) => {
    if (contentType.includes(APPLICATION_JSON)) {
        return resolveJSONParams(body);
    }
    if (body && typeof body === 'object') {
        return resolveFormDataParams(body);
    }
    if (typeof body === 'string') {
        return body;
    }
    return '';
};
const resolveJSONParams = (body) => JSON.stringify(body);
const resolveFormDataParams = (data) => {
    const body = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    return body.join('&');
};
const resolveFetchBody = (headers, body) => {
    if (headers instanceof Headers && headers.has('Content-Type')) {
        return resolveParams(body, headers.get('Content-Type'));
    }
    let h = headers;
    if (h &&
        typeof h === 'object' &&
        (h['Content-Type'] ||
            h['content-type'])) {
        return resolveParams(body, h['Content-Type'] || h['content-type'] || '');
    }
    // return body;
};
const resolveWeChatBody = (headers, body) => {
    const h = headers;
    if (h &&
        (h['Content-Type'] ||
            h['content-type'])) {
        return resolveParams(body, h['Content-Type'] || h['content-type'] || '');
    }
};
//# sourceMappingURL=ParamsPlugin.js.map