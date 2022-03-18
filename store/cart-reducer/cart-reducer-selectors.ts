import { PopupType } from '../../const';
import { CartGuitar, Guitar, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Cart;

export const getCartGuitars = (state: State): CartGuitar[] => state[field].cartGuitars;
export const getDiscount = (state: State): number => state[field].discount;

export const getGuitarFromPopup = (state: State): Guitar | null => state[field].guitarPopup;
export const getPopupType = (state: State): PopupType | null => state[field].popupType;
export const getCoupon = (state: State): string | null => state[field].coupon;

