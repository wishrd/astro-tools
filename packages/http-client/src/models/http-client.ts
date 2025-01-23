import type { HttpClientOptions } from './http-client-options.ts';
import type { HttpClientResponse } from './http-response.ts';

export type HttpClient = {
  (options: Omit<HttpClientOptions<void, void>, 'bodyAdapter'>): Promise<HttpClientResponse<void>>;
  <T, K>(options: Required<Pick<HttpClientOptions<T, K>, 'bodyAdapter'>> & Omit<HttpClientOptions<T, K>, 'bodyAdapter'>): Promise<HttpClientResponse<K>>;
};
