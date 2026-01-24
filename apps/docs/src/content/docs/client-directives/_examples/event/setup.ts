import { eventClientDirective } from '@astro-tools/client-directives/event';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [eventClientDirective()],
});
