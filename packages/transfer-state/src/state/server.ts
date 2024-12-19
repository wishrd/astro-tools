import { stateStorage } from '../state-storage.ts';
import type { StateKey } from '../models/state-key.ts';
import type { ServerTransferState } from '../models/server-transfer-state.ts';

function getStore(): ServerTransferState {
  const store = stateStorage.getStore();
  if (!store) {
    throw new Error('Server store is not defined!');
  }

  return store;
}

export function getState<T>(key: StateKey): T | null {
  return getStore()[typeof key === 'string' ? key : key.name]?.value as T | undefined || null;
}

export function setState<T>(key: StateKey, value: T | null): void {
  const store = getStore();
  const keyName = typeof key === 'string' ? key : key.name;

  let transfer: boolean;
  if (typeof key === 'string') {
    transfer = store[keyName] ? store[keyName].transfer : true;
  } else {
    transfer = key.transfer;
  }

  store[keyName] = { transfer, value };
}
