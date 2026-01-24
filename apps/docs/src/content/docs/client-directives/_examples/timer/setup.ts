import { timerClientDirective } from '@astro-tools/client-directives/timer';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [timerClientDirective()],
});
