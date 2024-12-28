<script lang="ts">
  import { onMount } from 'svelte';

  import { Output } from '@astro-tools/docs-utils/components';
  import { notifyHydration } from '@astro-tools/docs-utils/hydration/index.js';

  import { t } from '@astro-tools:i18n';

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
