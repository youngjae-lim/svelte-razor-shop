<script>
  import { afterUpdate } from 'svelte';
  import Item from './Item.svelte';
  import cart, { cartTotal, setStorageCart } from '../../stores/cart';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  afterUpdate(() => {
    setStorageCart($cart);
  });
</script>

<section class="cart-items">
  <!-- list of cart items -->
  <article>
    {#each $cart as item, index (item.id)}
      <div
        in:fly={{ x: 100, delay: (index + 1) * 200 }}
        out:fly={{ x: -100 }}
        animate:flip>
        <Item {...item} />
      </div>
    {:else}
      <h2 class="empty-cart">is currently empty...</h2>
    {/each}
  </article>
  <!-- cart price total -->
  <h3 class="cart-total">Total: ${$cartTotal}</h3>
</section>
