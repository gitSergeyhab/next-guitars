import { createAction } from '@reduxjs/toolkit';
import { CartGuitar, Comment, Guitar, GuitarWithComments } from '../types/types';
import { PopupType } from '../const';


const enum ActionType {
  //catalog
  LoadGuitars = 'catalog/LoadGuitars',
  SetGuitarsLoadingStatus = 'catalog/SetGuitarsLoadingStatus',
  SetGuitarsErrorStatus = 'catalog/SetGuitarsErrorStatus',
  // catalog - search
  LoadSearchGuitars = 'catalog/LoadSearchGuitars',
  SetSearchLoadingStatus = 'catalog/SetSearchLoadingStatus',
  // catalog - filter
  SetMinPrice = 'catalog/SetMinPrice',
  SetMaxPrice = 'catalog/SetMaxPrice',
  // catalog - pagination
  SetGuitarCount = 'pagination/SetGuitarsCount',


  //product
  LoadTheGuitar = 'guitar/LoadTheGuitar',
  SetTheGuitarLoadingStatus = 'guitar/SetTheGuitarLoadingStatus',
  SetTheGuitarErrorStatus = 'guitar/SetGuitarsErrorStatus',
  SetComments = 'guitar/SetComments',

  //popup
  SetGuitarToPopup = 'popup/SetGuitarToPopup',
  SetPopupType = 'popup/SetPopupType',
  //cart
  SetCartGuitars = 'cart/SetCartGuitars',
  SetDiscount = 'cart/SetDiscount',
  SetCoupon = 'cart/SetCoupon',
}

//catalog
export const loadGuitars = createAction(ActionType.LoadGuitars, (guitars: GuitarWithComments[]) => ({payload: guitars}));
export const setGuitarsLoadingStatus = createAction(ActionType.SetGuitarsLoadingStatus, (status: boolean) => ({payload: status}));
export const setGuitarsErrorStatus = createAction(ActionType.SetGuitarsErrorStatus, (status: boolean) => ({payload: status}));

// catalog - search
export const loadSearchGuitars = createAction(ActionType.LoadSearchGuitars, (guitars: Guitar[]) => ({payload: guitars}));
export const setSearchLoadingStatus = createAction(ActionType.SetSearchLoadingStatus, (status: boolean) => ({payload: status}));

// catalog - filter
export const setMinPrice = createAction(ActionType.SetMinPrice, (price: number | null) => ({payload: price}));
export const setMaxPrice = createAction(ActionType.SetMaxPrice, (price: number | null) => ({payload: price}));

// catalog - Pagination

export const setGuitarCount = createAction(ActionType.SetGuitarCount, (count: number) => ({payload: count}));

//product
export const loadTheGuitar = createAction(ActionType.LoadTheGuitar, (guitars: Guitar) => ({payload: guitars}));
export const setTheGuitarLoadingStatus = createAction(ActionType.SetTheGuitarLoadingStatus, (status: boolean) => ({payload: status}));
export const setTheGuitarErrorStatus = createAction(ActionType.SetTheGuitarErrorStatus, (status: boolean) => ({payload: status}));
export const setComments = createAction(ActionType.SetComments, (comments: Comment[]) => ({payload: comments}));

//popup
export const setGuitarToPopup = createAction(ActionType.SetGuitarToPopup, (guitar: Guitar | null) => ({payload: guitar}));
export const setPopupType = createAction(ActionType.SetPopupType, (status: PopupType | null) => ({payload: status}));
//cart
export const setCartGuitars = createAction(ActionType.SetCartGuitars, (cartGuitars: CartGuitar[]) => ({payload: cartGuitars}));
export const setDiscount = createAction(ActionType.SetDiscount, (percent: number) => ({payload: percent}));
export const setCoupon = createAction(ActionType.SetCoupon, (coupon: string | null) => ({payload: coupon}));
