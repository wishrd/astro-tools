import { defineConfig } from 'astro/config';

import { timerClientDirective } from '@astro-tools/client-directives/timer';

export default defineConfig({
	integrations: [
    timerClientDirective(),
	],
});
