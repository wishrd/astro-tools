import { defineConfig } from 'astro/config';

import { integration as astroOnClientDirective } from '@astro-tools/client-directives/on';

export default defineConfig({
	integrations: [
    astroOnClientDirective({
      directives: [
        { name: 'click', entrypoint: '@astro-tools/client-directives/click/directive' },
        { name: 'my-directive', entrypoint: './src/directives/my-directive.ts' },
      ]
    })
	],
});
