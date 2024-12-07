import { createResolver, defineIntegration } from 'astro-integration-kit';
import { z } from 'astro/zod';

const customClientDirectiveSchema = z.object({
  name: z.string(),
  entrypoint: z.string(),
});

type CustomClientDirective = z.infer<typeof customClientDirectiveSchema>;

export const onClientDirective = defineIntegration({
	name: '@astro-tools/client-directives/on',
  optionsSchema: z.object({
    directives: z.array(customClientDirectiveSchema),
  }),
	setup({ options }) {
    const { resolve } = createResolver(import.meta.url);

		return {
			hooks: {
        'astro:config:setup': ({ addClientDirective, injectScript }) => {
          const addClientDirectivePath = resolve('./add-client-directive.js');
          const customDirectiveMapper = (directive: CustomClientDirective) => `addClientDirective('${directive.name}', () => import('${directive.entrypoint}').then(d => d.default));`;
          injectScript('before-hydration', `import { addClientDirective } from '${addClientDirectivePath}'; ${options.directives.map(directive => customDirectiveMapper(directive)).join(' ')}`);

          addClientDirective({
            name: 'on',
            entrypoint: resolve('./directive.js'),
          });
        },
        'astro:config:done': ({ injectTypes }) => {
          injectTypes({
            filename: 'types.d.ts',
            content: `import 'astro'; declare module 'astro' { interface AstroClientDirectives { 'client:on'?: string; } }`,
          });
        }
      },
		};
	},
});
