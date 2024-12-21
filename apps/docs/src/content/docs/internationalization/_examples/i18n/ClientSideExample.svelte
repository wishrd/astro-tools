<script lang="ts">
  import { Output } from '@astro-tools/docs-utils/components';
  import { notifyHydration } from '@astro-tools/docs-utils/hydration/index.js';
  import { t } from '@astro-tools:i18n';
  import { onMount } from 'svelte';

  export let id: string;

  let count: number;
  let hydrated = false;

  onMount(() => {
    count = 10;
    hydrated = true;
    notifyHydration(id);
  });
</script>

<Output text={t('rating.title', { library: '@astro-tools/i18n' })} {hydrated} />
{#if count > 0}
  <Output text={t('rating.stars', { stars: 5 })} {hydrated} />
{:else}
  <!-- This translation is missing for es-ES -->
  <Output text={t('rating.empty')} {hydrated} />
{/if}
