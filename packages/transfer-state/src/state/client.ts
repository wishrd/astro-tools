import type { StateKey } from '../models/state-key.ts';
import type { TransferState } from '../models/transfer-state.ts';
import { unescapeString } from '../utils/sanitize-string.ts';
let store: TransferState;

function getStore(): TransferState {
  if (!store) {
    const state = document.getElementById('astro-tools-transfer-state');
    const stateContent = state !== null ? state.textContent || '{}' : '{}';
    const stateObject = JSON.parse(stateContent, (_, value) =>
      typeof value === 'string' ? unescapeString(value) : value,
    );
    store = stateObject;
  }

  return store;
}

export function getState<T>(key: StateKey): T | null {
  return (
    (getStore()[typeof key === 'string' ? key : key.name] as T | undefined) ||
    null
  );
}

export function setState<T>(key: StateKey, value: T | null): void {
  getStore()[typeof key === 'string' ? key : key.name] = value;
}
