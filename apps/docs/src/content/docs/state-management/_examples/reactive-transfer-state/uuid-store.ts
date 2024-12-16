import { atom } from 'nanostores';

import { withTransferState } from '@astro-tools:reactive-transfer-state';

export const uuidStore = withTransferState('uuid', atom<string | null>(null));
