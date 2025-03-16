import { describe, expect, it } from 'vitest';
import { mapBody } from './map-body.js';

describe('mapBody', () => {
  it('should return null when no body is provided', () => {
    const requestInit: RequestInit = {
      headers: {},
    };
    expect(mapBody(requestInit)).toBeNull();
  });

  it('should return null when Content-Type is not application/json', () => {
    const requestInit: RequestInit = {
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'test data',
    };
    expect(mapBody(requestInit)).toBeNull();
  });

  it('should stringify body when Content-Type is application/json', () => {
    const testData = { test: 'data' };
    const requestInit: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: testData as unknown as BodyInit,
    };
    expect(mapBody(requestInit)).toBe(JSON.stringify(testData));
  });

  it('should handle Headers instance in requestInit', () => {
    const testData = { test: 'data' };
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const requestInit: RequestInit = {
      headers,
      body: testData as unknown as BodyInit,
    };
    expect(mapBody(requestInit)).toBe(JSON.stringify(testData));
  });
});
