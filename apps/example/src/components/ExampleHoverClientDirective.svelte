<script lang="ts">
  import { onMount } from 'svelte';

  let active = false;

  onMount(() => {
    active = true;
  });

  function action() {
    console.log('mini square clicked!');
  }
</script>

<div class="example" class:hithere={active}>
  <div class="square">
    <button type="button" class="action" on:click={action}>Click me!</button>
  </div>
</div>

<style lang="scss">
  .example {
    display: flex;
    justify-content: center;
  }

  .square {
    width: 100px;
    height: 100px;
    background-color: cadetblue;
  }

  .action {
    width: 50px;
    height: 50px;
    background-color: black;
    color: white;
    border: none;
  }

  .hithere {
    animation: hithere 1s ease infinite;
  }

  @keyframes hithere {
    30% { transform: scale(1.2); }
    40%, 60% { transform: rotate(-20deg) scale(1.2); }
    50% { transform: rotate(20deg) scale(1.2); }
    70% { transform: rotate(0deg) scale(1.2); }
    100% { transform: scale(1); }
  }
</style>
