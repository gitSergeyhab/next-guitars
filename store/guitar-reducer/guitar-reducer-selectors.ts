import { Comment, Guitar, State } from '../../types/types';
import { ReducerName } from '../root-reducer';


const field = ReducerName.Guitar;

export const getTheGuitar = (state: State): Guitar | null => state[field].guitar;
export const getGuitarErrorStatus = (state: State): boolean => state[field].isError;
export const getGuitarLoadingStatus = (state: State): boolean => state[field].isLoading;
export const getComments = (state: State): Comment[] => state[field].comments;

