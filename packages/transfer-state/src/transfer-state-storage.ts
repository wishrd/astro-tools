import { AsyncLocalStorage } from 'async_hooks';

import type { TransferState } from './transfer-state.ts';

export const transferStateStorage = new AsyncLocalStorage<TransferState>();
