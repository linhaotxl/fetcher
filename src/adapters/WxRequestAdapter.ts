import { FResponse } from '../helper/FResponse';
import { Adapter } from './index';

export const createWxRequestAdapter: Adapter = () => {
    return ( context, next ) => new Promise(( resolve, reject ) => {
        const { request: { url, method, headers: header, dataType, responseType } } = context;
        let response: FResponse = null;

        wx.request({
            url, header, responseType,
            method: method as WxMethod,
            dataType: dataType as WxDataType,
            success: res => {
                response = new FResponse( res );
                resolve();
            },
            fail: ({ errMsg }) => {
                reject( new Error( errMsg ) );
            },
            complete: async () => {
                context.response = response;
                await next();
            }
        });
    })
}