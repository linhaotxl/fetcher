import { Fetcher } from './core/index';
export const createFetcher = (options) => {
    return new Fetcher(options);
};
const fetcher = createFetcher({});
export const fetch = fetcher.fetch.bind(fetcher);
//# sourceMappingURL=index.js.map