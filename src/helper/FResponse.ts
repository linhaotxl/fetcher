import { dealEnv } from '../helper/DealEnv';

export class FResponse {
    /** 响应信息 */
    response: any;

    constructor ( res: Response | RequestSuccessCallbackResult ) {
        this.initialState( res );
    }

    initialState ( res: Response | RequestSuccessCallbackResult ) {
        dealEnv({
            fetch: () => this.initialFetch( res as Response ),
            wechat: () => this.initialWeChat( res as RequestSuccessCallbackResult )
        });
    }

    initialWeChat ( response: RequestSuccessCallbackResult ) {
        const { header: headers, statusCode: status, data: body } = response;

        const ok = status >= 200 && status <= 299;
        this.response = {
            status, headers, body, ok,
            statusText: ok ? 'OK' : 'NO'
        };
    }

    initialFetch ( response: Response ) {
        this.response = response;
    }
}