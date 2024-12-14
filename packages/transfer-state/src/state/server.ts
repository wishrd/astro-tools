import { transferStateStorage } from '../transfer-state-storage.ts';
import type { TransferState } from '../transfer-state.ts';

function getStore(): TransferState {
  const store = transferStateStorage.getStore();
  if (!store) {
    throw new Error('Server store is not defined!');
  }

  return store;
}

export function getState<T>(key: string): T | null {
  return getStore()[key] as T | undefined || null;
}

export function setState<T>(key: string, value: T | null): void {
  getStore()[key] = value;
}
