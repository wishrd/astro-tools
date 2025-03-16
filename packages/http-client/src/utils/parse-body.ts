import type { HttpClientBodyAdapter } from '../models/http-client-options.js';

export async function parseBody<T, K>(
  response: Response,
  adapter?: HttpClientBodyAdapter<T, K>,
): Promise<K | undefined> {
  if (!adapter) {
    return;
  }

  if (
    !response.body ||
    !response.headers.has('Content-Type') ||
    !response.headers.get('Content-Type')?.includes('application/json')
  ) {
    throw new Error(
      'Cannot parse body, expecting body with Content-Type header value application/json',
    );
  }

  return adapter(await response.json());
}
