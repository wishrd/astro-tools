import type { HttpClientInitOptions } from './models/http-client-init-options.ts';
import type { HttpClientBodyAdapter, HttpClientOptions } from './models/http-client-options.ts';
import type { HttpClient } from './models/http-client.ts';
import { type HttpClientResponse, HttpClientResponseStatus } from './models/http-response.ts';

function mapBody(requestInit: RequestInit): BodyInit | null {
  const headers = new Headers(requestInit.headers);

  if (headers.get('Content-Type') === 'application/json' && requestInit.body) {
    return JSON.stringify(requestInit.body);
  }

  return null;
}

async function parseBody<T, K>(response: Response, adapter?: HttpClientBodyAdapter<T, K>): Promise<K | void> {
  if (!adapter) {
    return;
  }

  if (!response.body || !response.headers.has('Content-Type') || !response.headers.get('Content-Type')?.includes('application/json')) {
    throw new Error(`Cannot parse body, expecting body with Content-Type header value application/json`);
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

    const request = new Request(url, {
      ...options.requestOptions,
      body: options.requestOptions?.body ? mapBody(options.requestOptions) : null,
      signal: options.requestOptions?.signal ?? (options.timeout ? AbortSignal.timeout(options.timeout) : null),
    });

    initOptions.beforeRequest?.(request, options.requestOptions);

    try {
      let response = await fetch(request);
      response = initOptions.afterResponse?.(response, request, options.requestOptions) || response;

      if (response.ok) {
        const body = await parseBody(response, options.bodyAdapter);
        return { status: HttpClientResponseStatus.RESPONSE_SUCCESS, request, response, statusCode: response.status, body };
      }

      return { status: HttpClientResponseStatus.RESPONSE_ERROR, request, response, statusCode: response.status };
    } catch (error) {
      return { status: HttpClientResponseStatus.ERROR, request, error: error instanceof Error ? error : null };
    }
  };
}
