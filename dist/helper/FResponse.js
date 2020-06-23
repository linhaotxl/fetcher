import { dealEnv } from '../helper/DealEnv';
export class FResponse {
    constructor(res) {
        this.initialState(res);
    }
    initialState(res) {
        dealEnv({
            fetch: () => this.initialFetch(res),
            wechat: () => this.initialWeChat(res)
        });
    }
    initialWeChat(response) {
        const { header: headers, statusCode: status, data: body } = response;
        const ok = status >= 200 && status <= 299;
        this.response = {
            status, headers, body, ok,
            statusText: ok ? 'OK' : 'NO'
        };
    }
    initialFetch(response) {
        this.response = response;
    }
}
//# sourceMappingURL=FResponse.js.map