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
export const createWxRequestAdapter = () => {
    return (context, next) => new Promise((resolve, reject) => {
        const { request: { url, method, headers: header, dataType, responseType } } = context;
        let response = null;
        wx.request({
            url, header, responseType,
            method: method,
            dataType: dataType,
            success: res => {
                response = new FResponse(res);
                resolve();
            },
            fail: ({ errMsg }) => {
                reject(new Error(errMsg));
            },
            complete: () => __awaiter(void 0, void 0, void 0, function* () {
                context.response = response;
                yield next();
            })
        });
    });
};
//# sourceMappingURL=WxRequestAdapter.js.map