<script>
  import products, { featuredProducts } from '../../stores/products';
  import Product from './Product.svelte';
  import Loading from '../Loading.svelte';

  export let title = '';
</script>

<!-- HTML -->
{#if $featuredProducts.length === 0}
  <Loading />
{:else}
  <section class="section">
    <h2 class="section-title">{title}</h2>
    <div class="products-center">
      {#each $featuredProducts as product (product.id)}
        <Product {product} />
      {/each}
    </div>
  </section>
{/if}
