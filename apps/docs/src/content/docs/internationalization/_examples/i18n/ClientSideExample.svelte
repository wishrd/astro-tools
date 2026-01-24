<script lang="ts">
import { t } from '@astro-tools:i18n';
import { onMount } from 'svelte';
import { notifyHydration } from '@/libs/examples/hydration';
import Output from '@/libs/examples/Output.svelte';

export let id: string;

let hydrated = false;
let stars = 0;

onMount(() => {
  setInterval(() => stars++, 1000);
  hydrated = true;
  notifyHydration(id);
});
</script>

<p>{stars}</p>
<Output text={t('rating.title', { library: '@astro-tools/i18n' })} {hydrated} />
<Output text={t('rating.stars', stars, { stars: stars })} {hydrated} />
