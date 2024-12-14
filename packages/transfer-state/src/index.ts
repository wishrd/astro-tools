import { addVirtualImports, createResolver, defineIntegration } from 'astro-integration-kit';

const VIRTUAL_MODULE_ID = '@astro-tools:transfer-state';

export const transferState =  defineIntegration({
  name: '@astro-tools/transfer-state',
  setup: ({ name }) => {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': (options) => {
          const { addMiddleware } = options;

          addMiddleware({
            order: 'pre',
            entrypoint: resolve('./middleware.js'),
          });

          addVirtualImports(options, {
            name,
            imports: [
              {
                id: VIRTUAL_MODULE_ID,
                content: `export * from '${resolve('./state/server.js')}'`,
                context: 'server',
              },
              {
                id: VIRTUAL_MODULE_ID,
                content: `export * from '${resolve('./state/client.js')}'`,
                context: 'client',
              }
            ],
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `declare module '@astro-tools:transfer-state' { export const getState: <T>(key: string) => T; export const setState: <T>(key: string, value: T) => void; }`,
          });
        }
      }
    }
  },
});
