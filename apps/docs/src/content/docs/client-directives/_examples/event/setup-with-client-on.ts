import { defineConfig } from 'astro/config';

import { onClientDirective } from '@astro-tools/client-directives/on';

export default defineConfig({
  integrations: [
    onClientDirective({
      directives: [
        {
          name: 'event',
          entrypoint: '@astro-tools/client-directives/event/directive',
        },
      ],
    }),
  ],
});
