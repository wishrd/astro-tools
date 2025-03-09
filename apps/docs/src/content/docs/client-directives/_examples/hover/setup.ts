import { defineConfig } from 'astro/config';

import { hoverClientDirective } from '@astro-tools/client-directives/hover';

export default defineConfig({
  integrations: [hoverClientDirective()],
});
