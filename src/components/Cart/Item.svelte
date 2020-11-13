<script>
  import {
    removeItem,
    increaseAmount,
    decreaseAmount,
  } from '../../stores/cart';

  // These are the destructured variables passed through <Item {...item} /> in the each loop in the ItemsList.svelte
  export let id;
  export let image;
  export let title;
  export let price;
  export let amount;

  // import cart methods
</script>

<!-- HTML -->

<!-- cart item -->
<div class="cart-item">
  <!-- image -->
  <img src={image} alt={title} />
  <!-- product name & price & remove button -->
  <div>
    <h4>{title}</h4>
    <h5>${price}</h5>
    <button
      class="cart-btn remove-btn"
      on:click={() => removeItem(id)}>Remove</button>
  </div>
  <!-- amount & up/down arrows -->
  <div>
    <!-- up arrow button -->
    <button class="cart-btn amount-btn" on:click={() => increaseAmount(id)}>
      <i class="fas fa-chevron-up" />
    </button>
    <!-- the number of items -->
    <p class="item-amount">{amount}</p>
    <!-- down arrow button -->
    <button
      class="cart-btn amount-btn"
      on:click={() => decreaseAmount(id, amount)}>
      <i class="fas fa-chevron-down" />
    </button>
  </div>
</div>
