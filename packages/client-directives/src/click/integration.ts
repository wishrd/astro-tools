import { createResolver, defineIntegration } from 'astro-integration-kit';

export const clickClientDirective = defineIntegration({
  name: '@astro-tools/client-directives/click',
  setup() {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': ({ addClientDirective }) => {
          addClientDirective({
            name: 'click',
            entrypoint: resolve('./directive.js'),
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `import 'astro'; declare module 'astro' { interface AstroClientDirectives { 'client:click'?: string; } }`,
          });
        },
      },
    };
  },
});
