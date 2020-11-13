<script>
  import Hero from '../components/Hero.svelte';
  import Featured from '../components/Products/Featured.svelte';
  import { link } from 'svelte-routing';
</script>

<Hero>
  <a href="/products" class="btn btn-primary btn-hero" use:link>Shop Now</a>
</Hero>
<Featured title="Featured Products" />