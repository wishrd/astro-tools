import { reactiveTransferState } from '@astro-tools/reactive-transfer-state';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [reactiveTransferState()],
});
