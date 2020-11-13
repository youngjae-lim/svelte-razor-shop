import { writable, derived } from 'svelte/store';
// import localCart from '../localCart';

// localStorage
const getStorageCart = () => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
};

export const setStorageCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartStore = writable(getStorageCart());

// derived cart price total
export const cartTotal = derived(cartStore, ($cartStore) => {
  let total = $cartStore.reduce((acc, curr) => {
    return (acc += curr.amount * curr.price);
  }, 0);
  return total.toFixed(2);
});

// local functions
const remove = (id, items) => {
  return items.filter((item) => item.id !== id);
};

const toggleAmount = (id, items, action) => {
  return items.map((item) => {
    let newAmount;
    if (action === 'inc') {
      newAmount = item.amount + 1;
    } else if (action === 'dec') {
      newAmount = item.amount - 1;
    } else {
      newAmount = items.amount;
    }
    return item.id === id ? { ...item, amount: newAmount } : { ...item };
  });
};

// global functions
export const removeItem = (id) => {
  cartStore.update((items) => {
    return remove(id, items);
  });
};

export const increaseAmount = (id) => {
  cartStore.update((items) => {
    return toggleAmount(id, items, 'inc');
  });
};

export const decreaseAmount = (id, amount) => {
  cartStore.update((items) => {
    let updatedCart;

    if (amount === 1) {
      updatedCart = remove(id, items);
    } else {
      updatedCart = toggleAmount(id, items, 'dec');
    }
    return [...updatedCart];
  });
};

export const addToCart = (product) => {
  cartStore.update((items) => {
    const { id } = product;
    let item = items.find((item) => item.id === id);
    let updatedCart;

    if (item) {
      updatedCart = toggleAmount(id, items, 'inc');
    } else {
      let newItem = { ...product, amount: 1 };
      updatedCart = [...items, newItem];
    }
    return updatedCart;
  });
};

export default cartStore;
