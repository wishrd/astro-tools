import { clickClientDirective } from '@astro-tools/client-directives/click';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [clickClientDirective()],
});
