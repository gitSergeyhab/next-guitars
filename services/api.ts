import axios, { AxiosInstance } from 'axios';
import { BASE_URL } from '../const';



export const createAPI = (): AxiosInstance => {
  const api = axios.create({baseURL: BASE_URL});
  return api;
};
