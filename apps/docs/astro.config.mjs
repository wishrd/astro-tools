import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import { onClientDirective } from '@astro-tools/client-directives/on';
import { eventClientDirective } from '@astro-tools/client-directives/event';
import { clickClientDirective } from '@astro-tools/client-directives/click';
import { hoverClientDirective } from '@astro-tools/client-directives/hover';
import { timerClientDirective } from '@astro-tools/client-directives/timer';
import { viewportClientDirective } from '@astro-tools/client-directives/viewport';

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
    onClientDirective({
      directives: [
        { name: 'event', entrypoint: '@astro-tools/client-directives/event/directive' },
        { name: 'click', entrypoint: '@astro-tools/client-directives/click/directive' },
        { name: 'hover', entrypoint: '@astro-tools/client-directives/hover/directive' },
        { name: 'timer', entrypoint: '@astro-tools/client-directives/timer/directive' },
        { name: 'viewport', entrypoint: '@astro-tools/client-directives/viewport/directive' },
      ]
    }),
    eventClientDirective(),
    clickClientDirective(),
    hoverClientDirective(),
    timerClientDirective(),
    viewportClientDirective(),
	],
});
