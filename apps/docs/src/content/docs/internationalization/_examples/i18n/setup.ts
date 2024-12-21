import { defineConfig } from 'astro/config';

import { i18n } from '@astro-tools/i18n';

import { i18nSchemaLoader } from '@/config/i18n-schema-loader.mjs';

export default defineConfig({
	integrations: [
    i18n({ loader: i18nSchemaLoader('./i18n/en-US.json') }),
	],
});
