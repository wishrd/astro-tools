<script lang="ts">
  export let text: string;
  export let hydrated = false;
</script>

<div class="output" class:output--hydrated={hydrated}>{text}</div>

<style lang="scss">
  @use '@astro-tools/docs-utils/components/Output.scss';
</style>
