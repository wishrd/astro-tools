import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import { i18n } from '@astro-tools/i18n';

import i18nTypesProvider from '@/i18n/types-provider.mjs';

const resolve = (path: string) => join(dirname(fileURLToPath(import.meta.url)), path);

export default defineConfig({
	integrations: [
    i18n({
      types: i18nTypesProvider,
      providers: {
        translations: resolve('./src/i18n/translations-provider.ts'),
        plural: resolve('./src/i18n/plural-provider.ts'),
      }
    }),
	],
});
