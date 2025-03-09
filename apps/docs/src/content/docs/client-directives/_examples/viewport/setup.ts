import { defineConfig } from 'astro/config';

import { viewportClientDirective } from '@astro-tools/client-directives/viewport';

export default defineConfig({
  integrations: [viewportClientDirective()],
});
