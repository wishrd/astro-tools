declare module '@astro-tools:transfer-state' {
  export type StateKey = string | { name: string; transfer: boolean };
  export const getState: <T>(key: StateKey) => T;
  export const setState: <T>(key: StateKey, value: T) => void;
}
