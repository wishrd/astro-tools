declare module '@astro-tools:transfer-state' {
  export const getState: <T>(key: string) => T;
  export const setState: <T>(key: string, value: T) => void;
}
