export type HttpClientBodyAdapter<T, K> = (body: T) => K;

export type HttpClientSearch = string[][] | Record<string, string> | string | URLSearchParams;

export interface HttpClientOptions<T, K> {
  path: string;
  search?: HttpClientSearch;
  requestOptions?: RequestInit;
  timeout?: number;
  bodyAdapter?: HttpClientBodyAdapter<T, K>;
}
