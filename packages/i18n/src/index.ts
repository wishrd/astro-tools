import { addVirtualImports, createResolver, defineIntegration } from 'astro-integration-kit';

const VIRTUAL_MODULE_ID = '@astro-tools:i18n';

export const transferState =  defineIntegration({
  name: '@astro-tools/i18n',
  setup: ({ name }) => {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': (options) => {
          addVirtualImports(options, {
            name,
            imports: [
              {
                id: VIRTUAL_MODULE_ID,
                content: `export * from '${resolve('./core/translate.js')}'`,
              }
            ],
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            // TODO: generate
            content: `declare module '@astro-tools:i18n' { export const getState: <T>(key: string) => T; export const setState: <T>(key: string, value: T) => void; }`,
          });
        }
      }
    }
  },
});
