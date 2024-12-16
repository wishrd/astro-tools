import { addIntegration, addVirtualImports, createResolver, defineIntegration, hasIntegration } from 'astro-integration-kit';

import { transferState } from '@astro-tools/transfer-state';

const VIRTUAL_MODULE_ID = '@astro-tools:reactive-transfer-state';

export const reactiveTransferState =  defineIntegration({
  name: '@astro-tools/reactive-transfer-state',
  setup: ({ name }) => {
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
                content: `export * from '${resolve('./with-transfer-state.js')}'`,
              }
            ],
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `declare module '@astro-tools:reactive-transfer-state' { import type { ReadableAtom } from 'nanostores'; export function withTransferState<T extends ReadableAtom<unknown>>(key: string, store: T): T; }`,
          });
        }
      }
    }
  },
});
