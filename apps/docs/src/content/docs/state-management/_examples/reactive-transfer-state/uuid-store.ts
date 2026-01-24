import { withTransferState } from '@astro-tools:reactive-transfer-state';
import { atom } from 'nanostores';

export const uuidStore = withTransferState('uuid', atom<string | null>(null));
