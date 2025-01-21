export type HttpClientBaseUrl = (() => string) | string;

export type HttpClientBeforeRequest = (request: Request, requestOptions?: RequestInit) => void;

export type HttpClientAfterResponse = (response: Response, request: Request, requestOptions?: RequestInit) => Response;

export interface HttpClientInitOptions {
  baseUrl: HttpClientBaseUrl;
  beforeRequest?: HttpClientBeforeRequest;
  afterResponse?: HttpClientAfterResponse;
}
