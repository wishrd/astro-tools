export function t(key: string, values?: Record<string, string | number>): string {
  return `${key}:${Object.keys(values || {})}`;
}
