import { createResolver, defineIntegration } from 'astro-integration-kit';

export const viewportClientDirective = defineIntegration({
  name: '@astro-tools/client-directives/viewport',
  setup() {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': ({ addClientDirective }) => {
          addClientDirective({
            name: 'viewport',
            entrypoint: resolve('./directive.js'),
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `import 'astro'; declare module 'astro' { interface AstroClientDirectives { 'client:viewport'?: string; } }`,
          });
        },
      },
    };
  },
});
