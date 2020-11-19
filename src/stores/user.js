import { writable } from 'svelte/store';

// Get a user from the local storage if the user has logged in
const getStorageUser = () => {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { username: null, jwt: null };
};

// Set a user to the local storage
export const setStorageUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Set up a user store
const userStore = writable(getStorageUser());

// Set a user directly to the userStore
export const setUser = (user) => {
  userStore.set(user);
};

// clear the user local storage when logging out
export const logoutUser = () => {
  localStorage.clear();
  userStore.set({ username: null, jwt: null });
};

export default userStore;
