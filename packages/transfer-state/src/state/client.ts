import type { TransferState } from '../transfer-state.ts';

let store: TransferState;

function getStore(): TransferState {
  if (!store) {
    const state = document.getElementById('astro-tools-transfer-state');
    const stateObject = JSON.parse(state !== null ? (state.textContent || '{}') : '{}');
    store = stateObject;
  }

  return store;
}

export function getState<T>(key: string): T | null {
  return getStore()[key] as T | undefined || null;
}

export function setState<T>(key: string, value: T | null): void {
  getStore()[key] = value;
}
