// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import { loadConfig } from './astro.config.load.mjs';

const starlightConfig = await loadConfig();

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight(starlightConfig),
	],
});
