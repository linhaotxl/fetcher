import { Fetcher, IFetcherOptions } from './core/index';

export const createFetcher = ( options: Partial<IFetcherOptions> ) => {
    return new Fetcher( options );
}

const fetcher = createFetcher({});

export const fetch = fetcher.fetch.bind( fetcher );