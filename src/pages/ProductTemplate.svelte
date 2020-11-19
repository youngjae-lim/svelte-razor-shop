<script>
  // products data
  import products from '../stores/products';

  // stores
  import globalStore from '../stores/globalStore';
  import { addToCart } from '../stores/cart';

  // components
  import Loading from '../components/Loading.svelte';

  // 3rd part libraries
  import { link } from 'svelte-routing';

  // variables
  let openCart = globalStore.toggleItem;
  export let id; // id comes from product url - i.e., product/:id
  $: product = $products.find((item) => item.id === parseInt(id));
</script>

<!-- HTML -->

<!-- Head title -->
<svelte:head>
  <title>{!product ? 'Product' : product.title}</title>
</svelte:head>
{#if !product}
  <Loading />
{:else}
  <section class="single-product">
    <!-- BACK TO PRODUCTS button -->
    <a href="/products" class="btn btn-primary" use:link>Back To Products</a>
    <!-- a single product container -->
    <div class="single-product-container">
      <!-- product image -->
      <article class="single-product-image">
        <img src={product.image} alt={product.title} />
      </article>
      <!-- product title, price, description & ADD TO CART button -->
      <article>
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
        <button
          class="btn btn-primary btn-block"
          on:click={() => addToCart(product)}
          on:click={() => openCart('cart', true)}>
          Add to Cart
        </button>
      </article>
    </div>
  </section>
{/if}
