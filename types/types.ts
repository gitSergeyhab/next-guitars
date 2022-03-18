import { Action, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ReducerType } from '../store/root-reducer';

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number
};


export type Comment = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
};

export type GuitarWithComments = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number
  comments: Comment[],
};

export type Params = {[param: string]: string | string[]};

export type CartGuitar = {guitar: Guitar | GuitarWithComments, count: number};

export type Order = {
  guitarsIds: number[],
  coupon: string,
}

export type State = ReducerType;

export type ThunkActionResult<R=Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
