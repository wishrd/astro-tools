import type { HttpClientInitOptions } from './models/http-client-init-options.ts';
import type { HttpClientBodyAdapter, HttpClientOptions } from './models/http-client-options.ts';
import type { HttpClient } from './models/http-client.ts';
import { type HttpClientResponse, HttpClientResponseStatus } from './models/http-response.ts';

async function parseBody<T, K>(response: Response, adapter?: HttpClientBodyAdapter<T, K>): Promise<K | void> {
  if (!adapter) {
    return;
  }

  if (!response.body || !response.headers.has('Content-Type') || !response.headers.get('Content-Type')?.includes('application/json')) {
    throw new Error(`Cannot parse body, expecting body with Content-Type application/json`);
  }

  return adapter(await response.json());
}

export function httpClient(initOptions: HttpClientInitOptions): HttpClient {
  return async <T, K>(options: HttpClientOptions<T, K>): Promise<HttpClientResponse<K | void>> => {
    const baseUrl = typeof initOptions.baseUrl === 'string' ? initOptions.baseUrl : initOptions.baseUrl();
    const url = new URL(baseUrl + options.path);

    if (options.search) {
      const search = new URLSearchParams(options.search);
      search.forEach((value, key) => url.searchParams.append(key, value));
    }

    const request = new Request(url, options.requestOptions);

    initOptions.beforeRequest?.(request);

    const finalRequest = new Request(request, {
      signal: options.timeout ? AbortSignal.timeout(options.timeout) : null,
    });

    try {
      let response = await fetch(finalRequest);
      response = initOptions.afterResponse?.(response, finalRequest) || response;

      const ok = response.ok;

      if (ok) {
        const body = await parseBody(response, options.bodyAdapter);
        return { status: HttpClientResponseStatus.RESPONSE_SUCCESS, request: finalRequest, response, statusCode: response.status, body };
      }

      return { status: HttpClientResponseStatus.RESPONSE_ERROR, request: finalRequest, response, statusCode: response.status };
    } catch (error) {
      return { status: HttpClientResponseStatus.ERROR, request: finalRequest, error: error instanceof Error ? error : null };
    }
  };
}
