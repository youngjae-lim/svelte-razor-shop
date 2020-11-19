import { writable, derived } from 'svelte/store';
import getProducts from '../strapi/getProducts';

const store = writable([], () => {
  setProducts();
  return () => {};
});

async function setProducts() {
  let products = await getProducts();
  if (products) {
    products = flattenProducts(products);
    store.set(products);
  }
}

function flattenProducts(data) {
  return data.map((item) => {
    let imageUrl = item.image.url;
    return { ...item, image: imageUrl };
  });
}

// Featured Store
export const featuredProducts = derived(store, ($store) => {
  return $store.filter((product) => product.featured === true);
});

export default store;
