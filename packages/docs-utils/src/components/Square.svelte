<script lang="ts">
  import { onMount } from 'svelte';
  import { notifyHydration } from '../hydration';

  export let id: string;

  let hydrated = false;
  let text = 'Click me!';

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
  .square {
    cursor: pointer;
    width: 100px;
    height: 100px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    background-color: var(--at-color-hydration-off);
    transition: background-color 200ms ease;
  }

  .square--hydrated {
    background-color: var(--at-color-hydration-on);
  }
</style>
