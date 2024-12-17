import { type ReadableAtom } from 'nanostores';

import { getState, setState } from '@astro-tools:transfer-state';

export function withTransferState<T extends ReadableAtom<unknown>>(key: string, store: T): T {
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
    }
  });

  return store;
}
