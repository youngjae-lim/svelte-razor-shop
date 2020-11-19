<script>
  import { onMount } from 'svelte';
  import { navigate, link } from 'svelte-routing';
  import user from '../stores/user';
  import cart, { cartTotal } from '../stores/cart';
  import globalStore from '../stores/globalStore';
  import submitOrder from '../strapi/submitOrder';

  let name = '';

  $: isEmpty = !name || $globalStore.alert;

  // Stripe variables
  let cardElement;
  let cardErrors;
  let card;
  let stripe;
  let elements;

  onMount(() => {
    // If a user is not logged in, redirect to home page
    if (!$user.jwt) {
      navigate('/');
      return;
    }

    // Run Stripe client only when there is/are item(s) in the cart
    if ($cartTotal > 0) {
      // Create a Stripe client
      stripe = Stripe(
        'pk_test_51HnT4oJ7igKgEV3mCTPRazAK4Y1eeAhTHcVPljlyhpawxLhJSibTiSimXC5DtXZmu1OA08AfGmjYmzftwzVCQeJf00BO5XPW0k'
      );

      // Create an instance of Elements
      elements = stripe.elements();

      // Create an instance of the card Element
      card = elements.create('card');

      // Add an instance of the card Element into the binded cardElement <div>
      card.mount(cardElement);

      // Handle real-time validation errors from the card Element
      card.addEventListener('change', function (event) {
        if (event.error) {
          cardErrors.textContent = event.error.message;
        } else {
          cardErrors.textContent = '';
        }
      });
    }
  });

  const handleSubmit = async () => {
    // alert
    globalStore.toggleItem(
      'alert',
      true,
      'Submitting your order... Please wait!'
    );

    let response = await stripe
      .createToken(card)
      .catch((error) => console.log(error));

    const { token } = response;

    if (token) {
      const { id } = token;
      let order = await submitOrder({
        name,
        total: $cartTotal,
        items: $cart,
        stripeTokenId: id,
        userToken: $user.jwt,
      });

      if (order) {
        globalStore.toggleItem('alert', true, 'Your order is complete!');
        cart.set([]);
        localStorage.setItem('cart', JSON.stringify([]));
        navigate('/');
        return;
      } else {
        globalStore.toggleItem(
          'alert',
          true,
          'There was an error with your order. Please try again!',
          true
        );
      }
    } else {
    }
  };
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">Checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>Order Total: ${$cartTotal}</h3>
      <!-- Single Input -->
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>
      <!-- Stripe -->
      <div class="stripe-input">
        <!-- info -->
        <label for="card-element">Credit or Debit Card</label>
        <p class="stripe-info">
          Test using this credit card:
          <span>4242 4242 4242 4242</span>
          <br />
          Enter any 5 digits for the zip code
          <br />
          Enter any 3 digits for the CDC
        </p>
        <div id="card-element" bind:this={cardElement}>
          <!-- A Stripe Element will be inserted here. -->
        </div>
        <div id="card-errors" bind:this={cardErrors} role="alert">
          <!-- Used to display form errors. -->
        </div>
      </div>
      <!-- Error Message -->
      {#if isEmpty && !$globalStore.alert}
        <p class="form-empty">Please fill out name field</p>
      {/if}
      <!-- Submit Button -->
      <button
        type="submit"
        class="btn btn-block btn-primary"
        class:disabled={isEmpty}
        disabled={isEmpty}>Submit</button>
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>Your cart is empty</h2>
    <a href="/products" class="btn btn-primary" use:link>Fill it</a>
  </div>
{/if}
