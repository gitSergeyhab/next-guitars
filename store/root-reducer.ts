import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { cartReducer } from './cart-reducer/cart-reducer';
import { guitarReducer } from './guitar-reducer/guitar-reducer';
import { catalogReducer } from './catalog-reducer/catalog-reducer';
import { createAPI } from '../services/api';

const api = createAPI()


export const enum ReducerName {
  Catalog = 'Catalog',
  Guitar = 'Guitar',
  Cart = 'Cart',
}

export const rootReducer = combineReducers({
  [ReducerName.Catalog]: catalogReducer,
  [ReducerName.Guitar]: guitarReducer,
  [ReducerName.Cart]: cartReducer,
});

export type ReducerType = ReturnType<typeof rootReducer>;


export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: {extraArgument: api}}),
});

export const wrapper = createWrapper(() => store);
