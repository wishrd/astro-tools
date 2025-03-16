import { describe, expect, it } from 'vitest';
import type { HttpClientBodyAdapter } from '../models/http-client-options.js';
import { parseBody } from './parse-body.js';

describe('parseBody', () => {
  it('should return undefined when no adapter is provided', async () => {
    const response = new Response('{"test": "data"}', {
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await parseBody(response);
    expect(result).toBeUndefined();
  });

  it('should throw error when response has no body', async () => {
    const response = new Response(null);
    const adapter: HttpClientBodyAdapter<unknown, unknown> = (data) => data;

    await expect(parseBody(response, adapter)).rejects.toThrow(
      'Cannot parse body, expecting body with Content-Type header value application/json',
    );
  });

  it('should throw error when Content-Type header is missing', async () => {
    const response = new Response('{"test": "data"}');
    const adapter: HttpClientBodyAdapter<unknown, unknown> = (data) => data;

    await expect(parseBody(response, adapter)).rejects.toThrow(
      'Cannot parse body, expecting body with Content-Type header value application/json',
    );
  });

  it('should throw error when Content-Type is not application/json', async () => {
    const response = new Response('test data', {
      headers: { 'Content-Type': 'text/plain' },
    });
    const adapter: HttpClientBodyAdapter<unknown, unknown> = (data) => data;

    await expect(parseBody(response, adapter)).rejects.toThrow(
      'Cannot parse body, expecting body with Content-Type header value application/json',
    );
  });

  it('should parse JSON body and apply adapter', async () => {
    const testData = { test: 'data' };
    const response = new Response(JSON.stringify(testData), {
      headers: { 'Content-Type': 'application/json' },
    });

    const adapter: HttpClientBodyAdapter<typeof testData, string> = (data) =>
      data.test;
    const result = await parseBody(response, adapter);

    expect(result).toBe('data');
  });
});
