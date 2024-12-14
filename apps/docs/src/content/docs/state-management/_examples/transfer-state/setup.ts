import { defineConfig } from 'astro/config';

import { transferState } from '@astro-tools/transfer-state';

export default defineConfig({
	integrations: [
    transferState(),
	],
});
