import { defineConfig } from 'astro/config';

import { clickClientDirective } from '@astro-tools/client-directives/click';

export default defineConfig({
	integrations: [
    clickClientDirective(),
	],
});
