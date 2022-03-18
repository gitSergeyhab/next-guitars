import { CartGuitar } from '../types/types';

const cartKey = 'guitar-cart';

export const setCartGuitarsToStorage = (cartGuitars: CartGuitar[]) => localStorage.setItem(cartKey, JSON.stringify(cartGuitars));

export const getCartGuitarsFromStorage = () => {
  const guitarsString = localStorage.getItem(cartKey);
  const guitars = guitarsString ? JSON.parse(guitarsString) : [];
  return guitars as CartGuitar[];
};
