import { defineConfig } from 'astro/config';

import { reactiveTransferState } from '@astro-tools/reactive-transfer-state';

export default defineConfig({
	integrations: [
    reactiveTransferState(),
	],
});
