declare namespace WechatMiniprogram {
    type IAnyObject = Record<string, any>
    /** 接口调用成功的回调函数 */
    type RequestSuccessCallback = (result: RequestSuccessCallbackResult) => void
    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    type RequestCompleteCallback = (res: GeneralCallbackResult) => void
    /** 接口调用失败的回调函数 */
    type RequestFailCallback = (res: GeneralCallbackResult) => void
    /** HTTP Response Header 事件的回调函数 */
    type RequestTaskOffHeadersReceivedCallback = (res: GeneralCallbackResult) => void
    /** HTTP Response Header 事件的回调函数 */
    type RequestTaskOnHeadersReceivedCallback = (result: RequestTaskOnHeadersReceivedCallbackResult ) => void
    interface GeneralCallbackResult {
        errMsg: string
    }

    interface RequestSuccessCallbackResult {
        /** 开发者服务器返回的数据 */
        data: string | IAnyObject | ArrayBuffer
        /** 开发者服务器返回的 HTTP Response Header */
        header: IAnyObject
        /** 开发者服务器返回的 HTTP 状态码 */
        statusCode: number
        errMsg: string
    }

    interface RequestTaskOnHeadersReceivedCallbackResult {
        /** 开发者服务器返回的 HTTP Response Header */
        header: IAnyObject
    }

    interface RequestTask {
        /**
         * 中断请求任务
         */
        abort(): void
        /**
         * 取消监听 HTTP Response Header 事件
         */
        offHeadersReceived(
            /** HTTP Response Header 事件的回调函数 */
            callback: RequestTaskOffHeadersReceivedCallback,
        ): void
        /**
         * 监听 HTTP Response Header 事件。会比请求完成事件更早
         */
        onHeadersReceived(
            /** HTTP Response Header 事件的回调函数 */
            callback: RequestTaskOnHeadersReceivedCallback,
        ): void
    }

    interface RequestOption {
        /** 开发者服务器接口地址 */
        url: string
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: RequestCompleteCallback
        /** 请求的参数 */
        data?: string | IAnyObject | ArrayBuffer
        /** 返回的数据格式
         *
         * 可选值：
         * - 'json': 返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse;
         * - '其他': 不对返回的内容进行 JSON.parse; */
        dataType?: 'json' | '其他'
        /** 接口调用失败的回调函数 */
        fail?: RequestFailCallback
        /** 设置请求的 header，header 中不能设置 Referer。
         *
         * `content-type` 默认为 `application/json` */
        header?: IAnyObject
        /** HTTP 请求方法
         *
         * 可选值：
         * - 'OPTIONS': HTTP 请求 OPTIONS;
         * - 'GET': HTTP 请求 GET;
         * - 'HEAD': HTTP 请求 HEAD;
         * - 'POST': HTTP 请求 POST;
         * - 'PUT': HTTP 请求 PUT;
         * - 'DELETE': HTTP 请求 DELETE;
         * - 'TRACE': HTTP 请求 TRACE;
         * - 'CONNECT': HTTP 请求 CONNECT; */
        method?:
            | 'OPTIONS'
            | 'GET'
            | 'HEAD'
            | 'POST'
            | 'PUT'
            | 'DELETE'
            | 'TRACE'
            | 'CONNECT'
        /** 响应的数据类型
         *
         * 可选值：
         * - 'text': 响应的数据为文本;
         * - 'arraybuffer': 响应的数据为 ArrayBuffer;
         *
         * 最低基础库： `1.7.0` */
        responseType?: 'text' | 'arraybuffer'
        /** 接口调用成功的回调函数 */
        success?: RequestSuccessCallback
    }

    interface Wx {
        request(option: RequestOption): RequestTask
    }

    namespace Test {}
}

// declare type IAnyObject = WechatMiniprogram.IAnyObject;
// declare type RequestSuccessCallbackResult = WechatMiniprogram.RequestSuccessCallbackResult;
// declare type RequestResult = string | IAnyObject | ArrayBuffer;

declare const wx: WechatMiniprogram.Wx;

declare type WxRequestOption = WechatMiniprogram.RequestOption;
declare type WxRequestTask = WechatMiniprogram.RequestTask;
declare type RequestSuccessCallbackResult = WechatMiniprogram.RequestSuccessCallbackResult;

declare type WxRequestData = TypeOf<WechatMiniprogram.RequestOption, 'data'>;
declare type WxResponseType = TypeOf<WechatMiniprogram.RequestOption, 'responseType'>;
declare type WxDataType = TypeOf<WechatMiniprogram.RequestOption, 'dataType'>;
declare type WxMethod = TypeOf<WechatMiniprogram.RequestOption, 'method'>;