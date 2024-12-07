<script lang="ts">
  import { onMount } from 'svelte';
  import { listenHydration } from '../hydration';

  export let id: string;

  let status = 'Static';

  onMount(() => {
    listenHydration(id, () => status = 'Hydrated');
  });
</script>

<span>{status}</span>
