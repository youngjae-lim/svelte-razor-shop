<script>
  import LoginLink from '../LoginLink.svelte';
  import links from '../../constants/links';
  import { link } from 'svelte-routing';
  import { fly, fade } from 'svelte/transition';

  // global store
  import globalStore from '../../stores/globalStore';

  let closeSideBar = globalStore.toggleItem;
</script>

<!-- HTML -->
<div class="sidebar-container" transition:fly={{ x: -1000, duration: 500 }}>
  <div class="sidebar" transition:fade={{ delay: 500 }}>
    <!-- header -->
    <div class="sidebar-header">
      <button class="btn-close" on:click={() => closeSideBar('sidebar', false)}>
        <i class="fas fa-window-close" />
      </button>
    </div>
    <!-- site logo -->
    <img
      src="./assets/images/logo.svg"
      class="logo sidebar-logo"
      alt="razors logo" />
    <ul class="sidebar-links">
      {#each links as sideLink}
        <li>
          <a
            href={sideLink.url}
            use:link
            on:click={() => closeSideBar('sidebar', false)}>{sideLink.text}</a>
        </li>
      {/each}
      <li>
        <LoginLink />
      </li>
    </ul>
  </div>
</div>
