import { addIntegration, addVirtualImports, createResolver, defineIntegration, hasIntegration } from 'astro-integration-kit';
import { z } from 'astro/zod';

import { transferState } from '@astro-tools/transfer-state';

import { getTranslateFn } from './helpers/get-translate-fn.ts';

const VIRTUAL_MODULE_ID = '@astro-tools:i18n';

const pluralSchema = z.record(z.string(), z.string());
const typesLoaderSchema = z.function().returns(z.promise(z.record(z.string(), z.string().or(pluralSchema))));

export type I18nIntegrationTypesLoader = z.infer<typeof typesLoaderSchema>;

export const i18n = defineIntegration({
  name: '@astro-tools/i18n',
  optionsSchema: z.object({
    types: typesLoaderSchema,
    providers: z.object({
      plural: z.string(),
      translations: z.string(),
    })
  }),
  setup: ({ name, options }) => {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': (hookOptions) => {
          if (!hasIntegration(hookOptions, { name: '@astro-tools/transfer-state' })) {
						addIntegration(hookOptions, {
							ensureUnique: true,
							integration: transferState(),
						});
					}

          addVirtualImports(hookOptions, {
            name,
            imports: [
              {
                id: VIRTUAL_MODULE_ID,
                content: [
                  `import { init } from '${resolve('./core/init.js')}';`,
                  `import translationsProvider from '${options.providers.translations}';`,
                  `import pluralProvider from '${options.providers.plural}';`,
                  ``,
                  `init({ providers: { translations: translationsProvider, plural: pluralProvider } });`,
                  ``,
                  `export { use } from '${resolve('./core/use.js')}';`,
                  `export { locale } from '${resolve('./core/locale.js')}';`,
                  `export { fallbackLocale } from '${resolve('./core/fallback-locale.js')}';`,
                  `export { t } from '${resolve('./core/translate.js')}';`,
                ].join('\n'),
              }
            ],
          });
        },
        'astro:config:done': async ({ injectTypes }) => {
          const translateFn = getTranslateFn(await options.types());

          const content = [
            `import type { I18nUseOptions } from '@astro-tools/i18n';`,
            ``,
            `export function use(options: I18nUseOptions): Promise<void>;`,
            `export function locale(): string;`,
            `export function fallbackLocale(): string;`,
            ``,
            translateFn,
          ].join('\n');

          injectTypes({
            filename: 'types.d.ts',
            content: `declare module '${VIRTUAL_MODULE_ID}' {\n${content}\n}`,
          });
        }
      }
    }
  },
});
