import { HttpClientResponseStatus, type HttpClientResponse, type HttpClientSuccessResponse } from '../models/http-response';

export function throwOnError<T>(response: HttpClientResponse<T>): HttpClientSuccessResponse<T> {
  if (response.status !== HttpClientResponseStatus.RESPONSE_SUCCESS) {
    throw new Error('HttpClientError', { cause: response });
  }

  return response;
}
