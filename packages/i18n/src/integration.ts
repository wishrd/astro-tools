import { addIntegration, addVirtualImports, createResolver, defineIntegration, hasIntegration } from 'astro-integration-kit';
import { z } from 'astro/zod';

import { transferState } from '@astro-tools/transfer-state';

import { getTranslateFn } from './get-translate-fn.ts';

const VIRTUAL_MODULE_ID = '@astro-tools:i18n';

const loaderSchema = z.function().returns(z.promise(z.record(z.string(), z.string())));

export type I18nIntegrationLoader = z.infer<typeof loaderSchema>;

export const i18n =  defineIntegration({
  name: '@astro-tools/i18n',
  optionsSchema: z.object({
    loader: loaderSchema,
  }),
  setup: ({ name, options }) => {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': (options) => {
          if (!hasIntegration(options, { name: '@astro-tools/transfer-state' })) {
						addIntegration(options, {
							ensureUnique: true,
							integration: transferState(),
						});
					}

          addVirtualImports(options, {
            name,
            imports: [
              {
                id: VIRTUAL_MODULE_ID,
                content: `export * from '${resolve('./i18n.js')}'`,
              }
            ],
          });
        },
        'astro:config:done': async ({ injectTypes }) => {
          const translateFn = getTranslateFn(await options.loader());

          injectTypes({
            filename: 'types.d.ts',
            content: `declare module '@astro-tools:i18n' {\nimport type { I18nOptions } from '@astro-tools/i18n';\nexport function i18n(options: I18nOptions): Promise<void>;\nexport function locale(): string;\nexport function fallbackLocale(): string;\n${translateFn}\n}`,
          });
        }
      }
    }
  },
});
