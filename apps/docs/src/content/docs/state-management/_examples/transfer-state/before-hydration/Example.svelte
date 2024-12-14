<script lang="ts">
  import { onMount } from 'svelte';

  import { notifyHydration } from '@astro-tools/docs-utils/hydration';
  import { Output } from '@astro-tools/docs-utils/components';

  import { getState } from '@astro-tools:transfer-state';

  export let id: string;

  let hydrated = false;

  onMount(() => {
    hydrated = true;
    notifyHydration(id);
  });
</script>

<Output hydrated={hydrated} text={getState('uuid')} />
