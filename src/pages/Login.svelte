<script>
  import { onMount } from 'svelte'
  import loginUser from '../strapi/loginUser';
  import registerUser from '../strapi/registerUser';
  import { navigate } from 'svelte-routing';
  import globalStore from '../stores/globalStore';
  import user from '../stores/user'

  let email = '';
  let password = '';
  let username = 'default username';
  let isMember = true;

  $: isEmpty = !email || !password || !username || $globalStore.alert;

  onMount(() => {
    if ($user.jwt) {
      globalStore.toggleItem('alert', true, "You've logged in already!");
      navigate('/');
    }
  });
  // add alert

  const toggleMember = () => {
    isMember = !isMember;

    if (!isMember) {
      username = '';
    } else {
      username = 'default username';
    }
  };

  const handleSubmit = async function () {
    // add alert
    globalStore.toggleItem('alert', true, 'Loading data... Please wait!');

    let user;

    if (isMember) {
      user = await loginUser(email, password);
    } else {
      user = await registerUser(email, password, username);
    }

    if (user) {
      navigate('/products');
      // add alert
      globalStore.toggleItem('alert', true, 'Welcome to our razor shop!');
      return;
    }
    // add alert
    globalStore.toggleItem(
      'alert',
      true,
      'Email/Password Incorrect. Please try again!',
      true
    );
  };
</script>

<!-- HTML -->
<section class="form">
  <h2 class="section-title">
    {#if isMember}Sign in{:else}Register{/if}
  </h2>
  <form class="login-form" on:submit|preventDefault={handleSubmit}>
    <!-- single input: email -->
    <div class="form-control">
      <label for="email">email</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <!-- end of single input -->
    <!-- single input: password -->
    <div class="form-control">
      <label for="password">password</label>
      <input type="password" id="password" bind:value={password} />
    </div>
    <!-- end of single input -->
    {#if !isMember}
      <!-- single input: username -->
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" bind:value={username} />
      </div>
      <!-- end of single input -->
    {/if}
    {#if isEmpty && !$globalStore.alert}
      <p class="form-empty">please fill out all form fields</p>
    {/if}
    <button
      type="submit"
      class="btn btn-primary btn-block"
      class:disabled={isEmpty}
      disabled={isEmpty}>
      submit
    </button>
    {#if isMember}
      <p class="register-link">
        need to register?
        <button type="button" on:click={toggleMember}>click here</button>
      </p>
    {:else}
      <p class="register-link">
        already a member?
        <button type="button" on:click={toggleMember}>click here</button>
      </p>
    {/if}
  </form>
</section>
