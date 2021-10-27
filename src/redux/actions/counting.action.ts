import {Dispatch} from 'redux';

export enum CountingKeys {
  INCREMENT_COUNTING = 'INCREMENT_COUNTING',
  DECREMENT_COUNTING = 'DECREMENT_COUNTING',
}

export const incrementCounting = (count: number) => (dispatch: Dispatch) =>
  dispatch({
    type: CountingKeys.INCREMENT_COUNTING,
    payload: count,
  });
export const decrementCounting = (count: number) => (dispatch: Dispatch) =>
  dispatch({
    type: CountingKeys.DECREMENT_COUNTING,
    payload: count,
  });
