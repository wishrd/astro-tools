export enum HttpClientResponseStatus {
  RESPONSE_SUCCESS = 'response-success',
  RESPONSE_ERROR = 'response-error',
  ERROR = 'error',
}

export interface HttpClientSuccessResponse<T> {
  status: HttpClientResponseStatus.RESPONSE_SUCCESS;
  statusCode: number;
  request: Request;
  response: Response;
  body: T;
}

export interface HttpClientErrorResponse {
  status: HttpClientResponseStatus.RESPONSE_ERROR;
  statusCode: number;
  request: Request;
  response: Response;
}

export interface HttpClientError {
  status: HttpClientResponseStatus.ERROR;
  request: Request;
  error: Error | null;
}

export type HttpClientResponse<T> = HttpClientSuccessResponse<T> | HttpClientErrorResponse | HttpClientError;
