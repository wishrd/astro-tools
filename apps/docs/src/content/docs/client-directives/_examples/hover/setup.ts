import { hoverClientDirective } from '@astro-tools/client-directives/hover';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [hoverClientDirective()],
});
