import {
  type HttpClientRequestError,
  type HttpClientResponse,
  type HttpClientResponseError,
  HttpClientResponseStatus,
  type HttpClientResponseSuccess,
} from '../models/http-response';

export class HttpClientError extends Error {
  constructor(
    public readonly response: HttpClientResponseError | HttpClientRequestError,
  ) {
    super(`Error requesting ${response.request.url}`);
  }
}

export function throwOnError<T>(
  response: HttpClientResponse<T>,
): HttpClientResponseSuccess<T> {
  if (response.status !== HttpClientResponseStatus.RESPONSE_SUCCESS) {
    throw new HttpClientError(response);
  }

  return response;
}
