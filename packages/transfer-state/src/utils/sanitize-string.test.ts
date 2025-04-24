import { describe, expect, it } from 'vitest';
import { escapeString, unescapeString } from './sanitize-string.ts';

describe('escapeString', () => {
  it('should escape HTML special characters', () => {
    expect(escapeString('<')).toBe('\\u003C');
    expect(escapeString('>')).toBe('\\u003E');
    expect(escapeString("'")).toBe('\\u0027');
    expect(escapeString('"')).toBe('\\u0022');
    expect(escapeString('&')).toBe('\\u0026');
  });

  it('should not escape regular characters', () => {
    expect(escapeString('hello')).toBe('hello');
    expect(escapeString('123')).toBe('123');
    expect(escapeString('!@#$%')).toBe('!@#$%');
  });

  it('should handle mixed content', () => {
    expect(escapeString('<div>Hello & "World"</div>')).toBe(
      '\\u003Cdiv\\u003EHello \\u0026 \\u0022World\\u0022\\u003C/div\\u003E',
    );
  });

  it('should handle empty strings', () => {
    expect(escapeString('')).toBe('');
  });
});

describe('unescapeString', () => {
  it('should unescape HTML special characters', () => {
    expect(unescapeString('\\u003C')).toBe('<');
    expect(unescapeString('\\u003E')).toBe('>');
    expect(unescapeString('\\u0027')).toBe("'");
    expect(unescapeString('\\u0022')).toBe('"');
    expect(unescapeString('\\u0026')).toBe('&');
  });

  it('should not modify regular characters', () => {
    expect(unescapeString('hello')).toBe('hello');
    expect(unescapeString('123')).toBe('123');
    expect(unescapeString('!@#$%')).toBe('!@#$%');
  });

  it('should handle mixed content', () => {
    expect(
      unescapeString(
        '\\u003Cdiv\\u003EHello \\u0026 \\u0022World\\u0022\\u003C/div\\u003E',
      ),
    ).toBe('<div>Hello & "World"</div>');
  });

  it('should handle empty strings', () => {
    expect(unescapeString('')).toBe('');
  });

  it('should handle invalid unicode sequences', () => {
    expect(unescapeString('\\u123')).toBe('\\u123'); // Invalid length
    expect(unescapeString('\\u123G')).toBe('\\u123G'); // Invalid hex
  });
});
