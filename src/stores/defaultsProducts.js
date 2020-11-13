import { writable, derived } from 'svelte/store';
import localProducts from '../localProducts';

const store = writable(flattenProducts([...localProducts]));

// subscribe
// set
// update

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
