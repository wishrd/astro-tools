import { defineConfig } from 'astro/config';

import { eventClientDirective } from '@astro-tools/client-directives/event';

export default defineConfig({
	integrations: [
    eventClientDirective(),
	],
});
