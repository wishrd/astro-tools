<script lang="ts">
  import { onMount } from 'svelte';
  import { notifyHydration } from '@astro-tools/docs-utils/hydration';

  export let id: string;
  export let text: string;

  let hydrated = false;

  onMount(() => {
    hydrated = true;
    notifyHydration(id);
  });
</script>

<button
  type="button"
  class="square"
  class:square--hydrated={hydrated}
  on:click={() => text = 'Clicked!'}>
  {text}
</button>

<style lang="scss">
  @use '@astro-tools/docs-utils/components/Square.scss';
</style>
