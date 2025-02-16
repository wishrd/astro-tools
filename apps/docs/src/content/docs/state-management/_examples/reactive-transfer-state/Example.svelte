<script lang="ts">
  import { onMount } from 'svelte';

  import { notifyHydration } from '@/libs/examples/hydration';
  import Output from '@/libs/examples/Output.svelte';

  import { uuidStore } from './uuid-store';

  export let id: string;

  let hydrated = false;

  onMount(() => {
    hydrated = true;
    notifyHydration(id);
  });
</script>

<Output hydrated={hydrated} text={$uuidStore || 'UUID not defined'} />
