<script lang="ts">
import { notifyHydration } from '@/libs/examples/hydration';
import { onMount } from 'svelte';

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
