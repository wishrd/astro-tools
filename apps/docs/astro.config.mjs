import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import { integration as astroOnClientDirective } from '@astro-tools/client-directives/on';
import { integration as astroEventClientDirective } from '@astro-tools/client-directives/event';
import { integration as astroClickClientDirective } from '@astro-tools/client-directives/click';
import { integration as astroHoverClientDirective } from '@astro-tools/client-directives/hover';
import { integration as astroTimerClientDirective } from '@astro-tools/client-directives/timer';
import { integration as astroViewportClientDirective } from '@astro-tools/client-directives/viewport';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Astro Tools',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Client directives',
					autogenerate: { directory: 'client-directives' },
				}
			],
      customCss: [
        './src/styles/theme.scss',
      ],
		}),
    svelte(),
    astroOnClientDirective({
      directives: [
        { name: 'event', entrypoint: '@astro-tools/client-directives/event/directive' },
        { name: 'click', entrypoint: '@astro-tools/client-directives/click/directive' },
        { name: 'hover', entrypoint: '@astro-tools/client-directives/hover/directive' },
        { name: 'timer', entrypoint: '@astro-tools/client-directives/timer/directive' },
        { name: 'viewport', entrypoint: '@astro-tools/client-directives/viewport/directive' },
      ]
    }),
    astroEventClientDirective(),
    astroClickClientDirective(),
    astroHoverClientDirective(),
    astroTimerClientDirective(),
    astroViewportClientDirective(),
	],
});
