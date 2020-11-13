<script>
  import BigNavbar from './BigNavbar.svelte';
  import SmallNavbar from './SmallNavbar.svelte';

  // global store
  import globalStore from '../../stores/globalStore';

  let screenWidth;
  $: if (screenWidth > 992) {
    globalStore.toggleItem('sidebar', false);
  }
</script>

<svelte:window bind:innerWidth={screenWidth} />

<!-- HTML -->
{#if screenWidth > 992}
  <BigNavbar />
{:else}
  <SmallNavbar />
{/if}
