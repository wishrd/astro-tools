export enum HttpClientResponseStatus {
  RESPONSE_SUCCESS = 'response-success',
  RESPONSE_ERROR = 'response-error',
  REQUEST_ERROR = 'error',
}

export interface HttpClientResponseSuccess<T> {
  status: HttpClientResponseStatus.RESPONSE_SUCCESS;
  statusCode: number;
  request: Request;
  response: Response;
  body: T;
}

export interface HttpClientResponseError {
  status: HttpClientResponseStatus.RESPONSE_ERROR;
  statusCode: number;
  request: Request;
  response: Response;
}

export interface HttpClientRequestError {
  status: HttpClientResponseStatus.REQUEST_ERROR;
  request: Request;
  error: Error | null;
}

export type HttpClientResponse<T> =
  | HttpClientResponseSuccess<T>
  | HttpClientResponseError
  | HttpClientRequestError;
