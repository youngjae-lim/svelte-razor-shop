<script>
  // global store
  import globalStore from '../../stores/globalStore';

  // cart store
  import cart from '../../stores/cart';

  // reactive total # items for the cart icon on the navbar
  $: total = $cart.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);

  let openCart = globalStore.toggleItem;
</script>

<!-- HTML -->
<div class="btn-cart-container">
  <!-- cart button icon on the navbar -->
  <button class="btn-cart-toggle" on:click={() => openCart('cart', true)}>
    <i class="fas fa-cart-plus" />
  </button>
  <!-- total # items on top of the cart icon on the navbar -->
  <span class="btn-cart-items">{total}</span>
</div>
