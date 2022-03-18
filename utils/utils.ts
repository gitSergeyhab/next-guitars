import { CartGuitar, Comment, Guitar, GuitarWithComments, Order } from '../types/types';
import { GuitarInfo, GuitarType } from '../const';
import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { setGuitarToPopup, setPopupType } from '../store/actions';


export const getStringsCount = (types: GuitarType[]): number[] => {
  const stringsFromType = types.map((type) => GuitarInfo[type] ? GuitarInfo[type].strings : []);

  const unknownStrings = [...stringsFromType] as unknown;
  const originStrings = unknownStrings as number[][];
  const strings = originStrings.reduce((acc, elem) => [...acc, ...elem] , []);
  return [...Array.from(new Set(strings))];
};

export const getTruePath = (str: string): {src: string, srcSet: string} => {
  const noJpg = str.split('.')[0];
  const number = noJpg.split('-')[1];
  return {
    src: `/img/content/catalog-product-${number}.jpg`,
    srcSet: `/img/content/catalog-product-${number}@2x.jpg 2x`,
  };
};


export const getReviewDate = (date: string): string => new Date(date).toLocaleString('ru', {month: 'long',  day: '2-digit'});

export const changeGuitarInCart = (guitar: Guitar | GuitarWithComments, cartGuitars: CartGuitar[], plus: boolean) : CartGuitar[] => {
  const index = cartGuitars.findIndex((cartGuitar) => cartGuitar.guitar.vendorCode === guitar.vendorCode);

  if (index === -1 && plus) {
    cartGuitars = [...cartGuitars, { guitar, count: 1} ];
    return cartGuitars;
  }

  if (!plus && index !== -1 && cartGuitars[index].count === 1) {
    cartGuitars.splice(index, 1);
    return cartGuitars;
  }

  if (index !== -1) {
    if (plus) {
      cartGuitars[index] = {...cartGuitars[index], count: cartGuitars[index].count + 1 };
    } else {
      cartGuitars[index] = {...cartGuitars[index], count: cartGuitars[index].count - 1 };
    }
  }
  return cartGuitars;
};

export const checkGuitarInCart = (cartGuitars: CartGuitar[], id: number) => {
  const cartIds = cartGuitars.map((item) => item.guitar.id);
  return cartIds.some((cartId) => cartId === id);
};

export const getFullPrice = (cartGuitars: CartGuitar[]): number => cartGuitars.reduce((acc, item) => acc + item.count * item.guitar.price , 0);


const getGuitarIds = (cartGuitars: CartGuitar[]): number[] => {
  const idArrays = cartGuitars.map((guitar) => new Array(guitar.count).fill(null).map(() => guitar.guitar.id));
  return idArrays.reduce((acc, item) => [...acc, ...item] , []);
};

export const getOrder = (cartGuitars: CartGuitar[], coupon: string): Order => ({guitarsIds: getGuitarIds(cartGuitars), coupon});

export const makeStringPrice = (price : number): string => {
  const stringPrice = price.toString();
  const length = stringPrice.length;
  if (length > 3) {
    return `${stringPrice.slice(0, length - 3)} ${stringPrice.slice(length - 3)}`;
  }
  return stringPrice;
};

export const closePopup = (dispatch: Dispatch<Action>) => {
  dispatch(setGuitarToPopup(null));
  dispatch(setPopupType(null));
};

export const getRealRating = (comments: Comment[]) =>  comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
