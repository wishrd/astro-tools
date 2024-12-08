import { createResolver, defineIntegration } from 'astro-integration-kit';

export const hoverClientDirective = defineIntegration({
	name: '@astro-tools/client-directives/hover',
	setup() {
    const { resolve } = createResolver(import.meta.url);

		return {
			hooks: {
        'astro:config:setup': ({ addClientDirective }) => {
          addClientDirective({
            name: 'hover',
            entrypoint: resolve('./directive.js'),
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `import 'astro'; declare module 'astro' { interface AstroClientDirectives { 'client:hover'?: boolean; } }`,
          });
        }
      },
		};
	},
});
