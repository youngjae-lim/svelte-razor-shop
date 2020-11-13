<script>
  // cart button
  import CartButton from '../Cart/CartButton.svelte';
  // global store
  import globalStore from '../../stores/globalStore';

  import { link } from 'svelte-routing';

  let openSideBar = globalStore.toggleItem;
</script>

<!-- HTML -->
<nav class="navbar">
  <div class="nav-center">
    <button
      class="btn-sidebar-toggle"
      on:click={() => openSideBar('sidebar', true)}>
      <i class="fas fa-bars" />
    </button>
    <a href="/" class="nav-logo" use:link>
      <img src="./assets/images/logo.svg" class="logo" alt="razors logo" />
    </a>
    <CartButton />
  </div>
</nav>
