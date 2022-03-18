import { createReducer } from '@reduxjs/toolkit';
import { Guitar, GuitarWithComments } from '../../types/types';
import { loadGuitars, loadSearchGuitars, setGuitarCount, setGuitarsErrorStatus, setGuitarsLoadingStatus, setMaxPrice, setMinPrice, setSearchLoadingStatus } from '../actions';


type InitialState = {
  guitars: GuitarWithComments[],
  isLoading: boolean,
  isError: boolean,

  searchGuitars: Guitar[],
  searchLoading: boolean,

  guitarCount: number,

  minPrice: number | null,
  maxPrice: number | null,
}


export const initialState: InitialState = {
  guitars: [],
  isLoading: true,
  isError: false,

  searchGuitars: [],
  searchLoading: false,

  guitarCount: 0,

  minPrice: null,
  maxPrice: null,

};


export const catalogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
      state.isLoading = false;
    })
    .addCase(loadSearchGuitars, (state, action) => {state.searchGuitars = action.payload;})
    .addCase(setSearchLoadingStatus, (state, action) => {state.searchLoading = action.payload;})
    .addCase(setGuitarsLoadingStatus, (state, action) => {state.isLoading = action.payload;})
    .addCase(setGuitarsErrorStatus, (state, action) => {state.isError = action.payload;})

    .addCase(setMinPrice, (state, action) => {state.minPrice = action.payload;})
    .addCase(setMaxPrice, (state, action) => {state.maxPrice = action.payload;})
    .addCase(setGuitarCount, (state, action) => {state.guitarCount = action.payload;});


});
