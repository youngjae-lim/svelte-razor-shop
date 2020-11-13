<script>
  import user from '../stores/user';
  import { link } from 'svelte-routing';
  import globalStore from '../stores/globalStore';

  let closeSideBar = globalStore.toggleItem;
</script>

<!-- HTML -->
{#if $user.jwt}
  <a
    href="/"
    class="logout-btn"
    on:click={() => {
      closeSideBar('sidebar', false);
    }}
    use:link>Logout</a>
{:else}
  <a
    href="/login"
    on:click={() => {
      closeSideBar('sidebar', false);
    }}
    use:link>Login</a>
{/if}
