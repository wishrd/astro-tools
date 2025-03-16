export function mapBody(requestInit: RequestInit): BodyInit | null {
  const headers = new Headers(requestInit.headers);

  if (headers.get('Content-Type') === 'application/json' && requestInit.body) {
    return JSON.stringify(requestInit.body);
  }

  return null;
}
