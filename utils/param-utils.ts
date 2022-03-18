import qs from 'qs';

import { getPageCount, getStartGuitar } from './pagination-utils';
import { Params } from '../types/types';
import { GUITARS_PER_PAGE, ParamName } from '../const';


const defaultParams = {
  [ParamName.Range.Limit] : GUITARS_PER_PAGE,
};


export const getParams = (search: string) : Params => {
  const params = qs.parse(search.split('?')[1]);
  return params as Params;
};

export const makeNewSearch = (search: string, param = '', value: null | string | string[] | number | number[] = '') => {

  const urlOriginParams = getParams(search);
  const urlParams: Params = Object.keys(urlOriginParams).filter((item) => urlOriginParams[item] !== null && urlOriginParams[item] !== '').reduce((acc, item) => ({...acc, [item]: urlOriginParams[item]}) , {});

  const newParamValue = value !== '' ? {[param]: value} : {};

  const page = urlParams[ParamName.Range.Page];
  if (page && param !== ParamName.Range.Page) { // чтобы номер страницы был в конце url
    delete urlParams[ParamName.Range.Page];
    const newParams = {...defaultParams, ...urlParams, ...newParamValue, [ParamName.Range.Page]: page};
    return `?${qs.stringify(newParams)}`;
  }
  const newParams = {...defaultParams, ...urlParams, ...newParamValue};
  return `?${qs.stringify(newParams)}`;
};


export const getTypesFromUrl = (search: string) => {
  const urlParams = getParams(search);
  const param = urlParams[ParamName.Filter.Type];

  if (!param) {
    return [];
  }
  if (typeof param === 'string') {
    return [param];
  }
  return param;
};

export const getPriceFromUrl = (search: string, paramName: string) => {
  const urlParams = getParams(search);
  const param = urlParams[paramName];
  return param === null ? null : +param;
};


export const getStringCountFromUrl = (search: string) => {
  const urlParams = getParams(search);
  const param = urlParams[ParamName.Filter.StringCount];
  if (!param) {
    return [];
  }
  if (typeof param === 'string') {
    return [+param];
  }
  return param.map((item) => +item);
};


export const checkSort = (search: string) => {
  const urlParams = getParams(search);
  return !!urlParams[ParamName.Sort.Sort];
};

export const getSortAndOrder = (search: string) => {
  const urlParams = getParams(search);
  return {
    sort: urlParams[ParamName.Sort.Sort] as string,
    order: urlParams[ParamName.Sort.Order] as string,
  };
};

export const getPageParamsFromUrl = (search: string, guitarCount: number) => {
  const urlParams = getParams(search);
  const limitFromUrl = urlParams[ParamName.Range.Limit];
  const limit = limitFromUrl ? +limitFromUrl : GUITARS_PER_PAGE;
  const currentPage = +urlParams[ParamName.Range.Page] || 1;
  return {
    currentPage,
    limit,
    pageCount: getPageCount(guitarCount, limit),
    start: getStartGuitar(currentPage, limit),
  };
};
