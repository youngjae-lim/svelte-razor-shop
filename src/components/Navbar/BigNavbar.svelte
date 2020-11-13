<script>
  import CartButton from '../Cart/CartButton.svelte';
  import LoginLink from '../LoginLink.svelte';
  import links from '../../constants/links';
  import { link } from 'svelte-routing';
</script>

<!-- HTML -->
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-center">
      <!-- nav links -->
      <ul class="nav-links">
        {#each links as navLink}
          <li><a href={navLink.url} use:link>{navLink.text}</a></li>
        {/each}
      </ul>
      <!-- nav logo -->
      <a href="/" class="nav-logo big-logo" use:link>
        <img src="./assets/images/logo.svg" alt="razors logo" class="logo" />
      </a>
      <div class="nav-aside">
        <LoginLink />
        <CartButton />
      </div>
    </div>
  </div>
</nav>
