<script lang="ts">
import { onMount } from 'svelte';

import Output from '@/libs/examples/Output.svelte';
import { notifyHydration } from '@/libs/examples/hydration';

import { getState } from '@astro-tools:transfer-state';

export let id: string;

let hydrated = false;
let text = 'Waiting for hydration...';

onMount(() => {
  text = getState('uuid-after-hydration');
  hydrated = true;
  notifyHydration(id);
});
</script>

<Output hydrated={hydrated} text={text} />
