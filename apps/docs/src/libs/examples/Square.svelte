<script lang="ts">
  import { onMount } from 'svelte';
  import { notifyHydration } from '@/libs/examples/hydration';

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
  @use './Square.scss';
</style>
