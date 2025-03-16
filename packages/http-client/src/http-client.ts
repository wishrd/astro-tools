import type { HttpClientInitOptions } from './models/http-client-init-options.js';
import type { HttpClientOptions } from './models/http-client-options.js';
import type { HttpClient } from './models/http-client.js';
import {
  type HttpClientResponse,
  HttpClientResponseStatus,
} from './models/http-response.js';
import { mapBody } from './utils/map-body.js';
import { parseBody } from './utils/parse-body.js';

export function httpClient(initOptions: HttpClientInitOptions): HttpClient {
  return async <T, K>(
    options: HttpClientOptions<T, K>,
  ): Promise<HttpClientResponse<K | undefined>> => {
    const baseUrl =
      typeof initOptions.baseUrl === 'string'
        ? initOptions.baseUrl
        : initOptions.baseUrl();
    const url = new URL(baseUrl + options.path);

    if (options.search) {
      const search = new URLSearchParams(options.search);
      search.forEach((value, key) => url.searchParams.append(key, value));
    }

    const request = new Request(url, {
      ...options.requestOptions,
      body: options.requestOptions?.body
        ? mapBody(options.requestOptions)
        : null,
      signal:
        options.requestOptions?.signal ??
        (options.timeout ? AbortSignal.timeout(options.timeout) : null),
    });

    initOptions.beforeRequest?.(request, options.requestOptions);

    try {
      let response = await fetch(request);
      response =
        initOptions.afterResponse?.(
          response,
          request,
          options.requestOptions,
        ) || response;

      if (response.ok) {
        const body = await parseBody(response, options.bodyAdapter);
        return {
          status: HttpClientResponseStatus.RESPONSE_SUCCESS,
          request,
          response,
          statusCode: response.status,
          body,
        };
      }

      return {
        status: HttpClientResponseStatus.RESPONSE_ERROR,
        request,
        response,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        status: HttpClientResponseStatus.REQUEST_ERROR,
        request,
        error: error instanceof Error ? error : null,
      };
    }
  };
}
