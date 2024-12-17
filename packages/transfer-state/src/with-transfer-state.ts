import type { MiddlewareNext } from 'astro';

import type { TransferState } from './models/transfer-state.ts';
import { stateStorage } from './state-storage.ts';

export function withTransferState(callback: MiddlewareNext): Promise<{ response: Response, getTransferState: () => TransferState }> {
  return new Promise((resolve) => stateStorage.run({}, async () => {
    const response = await callback();
    const serverState = stateStorage.getStore() || {};

    resolve({
      response,
      getTransferState: () => {
        return Object.keys(serverState).reduce<TransferState>((state, key) => {
          if (serverState[key]?.transfer) {
            state[key] = serverState[key].value;
          }

          return state;
        }, {});
      },
    });
  }));
}
