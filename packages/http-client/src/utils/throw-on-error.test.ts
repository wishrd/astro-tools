import { describe, expect, it } from 'vitest';
import { HttpClientResponseStatus } from '../models/http-response.js';
import type {
  HttpClientRequestError,
  HttpClientResponseError,
  HttpClientResponseSuccess,
} from '../models/http-response.js';
import { HttpClientError, throwOnError } from './throw-on-error.js';

describe('HttpClientError', () => {
  it('should create error with correct message for response error', () => {
    const responseError: HttpClientResponseError = {
      status: HttpClientResponseStatus.RESPONSE_ERROR,
      request: new Request('https://api.example.com/test', { method: 'GET' }),
      response: new Response(null, { status: 404 }),
      statusCode: 404,
    };

    const error = new HttpClientError(responseError);
    expect(error.message).toBe('Error requesting https://api.example.com/test');
    expect(error.response).toBe(responseError);
  });

  it('should create error with correct message for request error', () => {
    const requestError: HttpClientRequestError = {
      status: HttpClientResponseStatus.REQUEST_ERROR,
      request: new Request('https://api.example.com/test', { method: 'GET' }),
      error: new Error('Network error'),
    };

    const error = new HttpClientError(requestError);
    expect(error.message).toBe('Error requesting https://api.example.com/test');
    expect(error.response).toBe(requestError);
  });
});

describe('throwOnError', () => {
  it('should return response when status is success', () => {
    const successResponse: HttpClientResponseSuccess<string> = {
      status: HttpClientResponseStatus.RESPONSE_SUCCESS,
      request: new Request('https://api.example.com/test', { method: 'GET' }),
      response: new Response('test data'),
      statusCode: 200,
      body: 'test data',
    };

    expect(throwOnError(successResponse)).toBe(successResponse);
  });

  it('should throw HttpClientError when status is response error', () => {
    const responseError: HttpClientResponseError = {
      status: HttpClientResponseStatus.RESPONSE_ERROR,
      request: new Request('https://api.example.com/test', { method: 'GET' }),
      response: new Response(null, { status: 404 }),
      statusCode: 404,
    };

    expect(() => throwOnError(responseError)).toThrow(HttpClientError);
  });

  it('should throw HttpClientError when status is request error', () => {
    const requestError: HttpClientRequestError = {
      status: HttpClientResponseStatus.REQUEST_ERROR,
      request: new Request('https://api.example.com/test', { method: 'GET' }),
      error: new Error('Network error'),
    };

    expect(() => throwOnError(requestError)).toThrow(HttpClientError);
  });
});
