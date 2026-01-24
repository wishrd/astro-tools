import { transferState } from '@astro-tools/transfer-state';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [transferState()],
});
