import { createResolver, defineIntegration } from 'astro-integration-kit';

export const mediaClientDirective = defineIntegration({
	name: '@astro-tools/client-directives/media',
	setup() {
    const { resolve } = createResolver(import.meta.url);

		return {
			hooks: {
        'astro:config:setup': ({ addClientDirective }) => {
          addClientDirective({
            name: 'media',
            entrypoint: resolve('./directive.js'),
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `import 'astro'; declare module 'astro' { interface AstroClientDirectives { 'client:media'?: string; } }`,
          });
        }
      },
		};
	},
});
