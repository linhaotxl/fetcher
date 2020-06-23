import { Middleware } from './index';
import { dealEnv } from '../helper/DealEnv';
import { FResponse } from '../helper/FResponse';

export const DataTypePlugin: Middleware = async ( context, next ) => {
    await next();

    const { request: { dataType }, response } = context;

    const result = await dealEnv({
        wechat: () => dataTypeWeChat( dataType as WxDataType ),
        fetch: () => dataTypeFetch( dataType as FetchDataType )
    });

    return result;
}

const dataTypeFetch = async(
    dataType: FetchDataType,
    // response: FResponse
): Promise<any> => {
    // const data = response as Response;
    // return await data[dataType]();
}

const dataTypeWeChat = (
    dataType: WxDataType,
    // response: FResponse
): Promise<any> => {
    return Promise.resolve();
}