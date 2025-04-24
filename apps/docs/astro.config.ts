import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { clickClientDirective } from '@astro-tools/client-directives/click';
import { eventClientDirective } from '@astro-tools/client-directives/event';
import { hoverClientDirective } from '@astro-tools/client-directives/hover';
import { onClientDirective } from '@astro-tools/client-directives/on';
import { timerClientDirective } from '@astro-tools/client-directives/timer';
import { viewportClientDirective } from '@astro-tools/client-directives/viewport';
import { i18n } from '@astro-tools/i18n';
import { reactiveTransferState } from '@astro-tools/reactive-transfer-state';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

import { typesLoader as i18nTypesLoader } from './src/i18n/types-loader.ts';

const resolve = (path: string) =>
  join(dirname(fileURLToPath(import.meta.url)), path);

export default defineConfig({
  integrations: [
    starlight({
      title: 'Astro Tools',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/wishrd/astro-tools',
        },
      ],
      sidebar: [
        {
          label: 'Client directives',
          autogenerate: { directory: 'client-directives' },
        },
        {
          label: 'State management',
          autogenerate: { directory: 'state-management' },
        },
        {
          label: 'Internationalization',
          autogenerate: { directory: 'internationalization' },
        },
        {
          label: 'Network',
          autogenerate: { directory: 'network' },
        },
        {
          label: 'Tools',
          autogenerate: { directory: 'tools' },
        },
      ],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      components: {
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      customCss: ['./src/styles/theme.scss'],
    }),
    svelte(),
    reactiveTransferState(),
    i18n({
      types: i18nTypesLoader(),
      providers: {
        plural: resolve('./src/i18n/plural-provider.ts'),
        translations: resolve('./src/i18n/translations-provider.ts'),
      },
    }),
    onClientDirective({
      directives: [
        {
          name: 'event',
          entrypoint: '@astro-tools/client-directives/event/directive',
        },
        {
          name: 'click',
          entrypoint: '@astro-tools/client-directives/click/directive',
        },
        {
          name: 'hover',
          entrypoint: '@astro-tools/client-directives/hover/directive',
        },
        {
          name: 'timer',
          entrypoint: '@astro-tools/client-directives/timer/directive',
        },
        {
          name: 'viewport',
          entrypoint: '@astro-tools/client-directives/viewport/directive',
        },
      ],
    }),
    eventClientDirective(),
    clickClientDirective(),
    hoverClientDirective(),
    timerClientDirective(),
    viewportClientDirective(),
  ],
});
