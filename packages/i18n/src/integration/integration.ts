import { addIntegration, addVirtualImports, createResolver, defineIntegration, hasIntegration } from 'astro-integration-kit';
import { z } from 'astro/zod';

import { transferState } from '@astro-tools/transfer-state';

import { getTranslateFn } from './types/get-translate-fn.ts';

const VIRTUAL_MODULE_ID = '@astro-tools:i18n';

const pluralSchema = z.record(z.string(), z.string());

const typesLoader = z.function().returns(z.promise(z.record(z.string(), z.string().or(pluralSchema))));

export type I18nIntegrationTypesLoader = z.infer<typeof typesLoader>;

export const i18n =  defineIntegration({
  name: '@astro-tools/i18n',
  optionsSchema: z.object({
    types: typesLoader,
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
                content: `
import { init } from '${resolve('./core/init.js')}';
import translationsProvider from '${options.providers.translations}';
import pluralProvider from '${options.providers.plural}';
init({ providers: { translations: translationsProvider, plural: pluralProvider } });
export { use, locale, fallbackLocale, t } from '${resolve('./core/i18n.js')}';
`,
              }
            ],
          });
        },
        'astro:config:done': async ({ injectTypes }) => {
          const translateFn = getTranslateFn(await options.types());

          injectTypes({
            filename: 'types.d.ts',
            content: `declare module '@astro-tools:i18n' {\nimport type { I18nUseOptions } from '@astro-tools/i18n';\nexport function use(options: I18nUseOptions): Promise<void>;\nexport function locale(): string;\nexport function fallbackLocale(): string;\n${translateFn}\n}`,
          });
        }
      }
    }
  },
});
