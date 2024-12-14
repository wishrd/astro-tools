import type { MiddlewareNext } from 'astro';

import type { TransferState } from './transfer-state.ts';
import { transferStateStorage } from './transfer-state-storage.ts';

export function withTransferState(callback: MiddlewareNext): Promise<{ response: Response, transferState: TransferState }> {
  return new Promise((resolve) => transferStateStorage.run({}, async () => resolve({
    response: await callback(),
    transferState: transferStateStorage.getStore() || {},
  })));
}
