import { createReducer } from '@reduxjs/toolkit';
import { PopupType } from '../../const';
import { CartGuitar, Guitar } from '../../types/types';
import {setCartGuitars, setCoupon, setDiscount, setGuitarToPopup, setPopupType } from '../actions';


// С Л Е Д У Ю Щ И Й   Э Т А П


type InitialState = {
  cartGuitars: CartGuitar[],
  discount: number,
  coupon: string | null,

  guitarPopup: Guitar | null
  popupType: PopupType | null,
}

export const initialState: InitialState = {
  cartGuitars: [],
  discount: 0,
  coupon: '',


  guitarPopup: null,
  popupType: null,
};


export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCartGuitars, (state, action) => {
      state.cartGuitars = action.payload;
      state.guitarPopup = null;
    })
    .addCase(setDiscount, (state, action) => {state.discount = action.payload;})

    .addCase(setPopupType, (state, action) => {state.popupType = action.payload;})
    .addCase(setGuitarToPopup, (state, action) => {state.guitarPopup = action.payload;})
    .addCase(setCoupon, (state, action) => {state.coupon = action.payload;});
});

