import { getState, type StateKey, setState } from '@astro-tools:transfer-state';
import type { ReadableAtom } from 'nanostores';

export function withTransferState<T extends ReadableAtom<unknown>>(
  key: StateKey,
  store: T,
): T {
  const initialValue = store.value;

  Object.defineProperty(store, 'value', {
    get() {
      const value = getState(key);
      if (!value) {
        setState(key, initialValue);
      }

      return getState(key);
    },
    set(value) {
      setState(key, value);
    },
  });

  return store;
}
