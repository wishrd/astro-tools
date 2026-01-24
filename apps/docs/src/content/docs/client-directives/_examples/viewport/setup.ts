import { viewportClientDirective } from '@astro-tools/client-directives/viewport';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [viewportClientDirective()],
});
