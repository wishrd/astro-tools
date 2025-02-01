import { AsyncLocalStorage } from 'node:async_hooks';

import type { ServerTransferState } from './models/server-transfer-state.ts';

export const stateStorage = new AsyncLocalStorage<ServerTransferState>();
