export type HttpClientBaseUrl = (() => string) | string;

export type HttpClientBeforeRequest = (request: Request) => void;

export type HttpClientAfterResponse = (response: Response, request: Request) => Response;

export interface HttpClientInitOptions {
  baseUrl: HttpClientBaseUrl;
  beforeRequest?: HttpClientBeforeRequest;
  afterResponse?: HttpClientAfterResponse;
}
