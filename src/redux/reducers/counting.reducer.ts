import { AnyAction } from 'redux';
import { CountingKeys } from 'redux/actions/counting.action';

export interface ICountingState {
  counting: number;
}

const initial = {
  counting: 0,
};

export default function countingReducer(
  state: ICountingState = initial,
  action: AnyAction
): ICountingState {
  switch (action.type) {
    case CountingKeys.INCREMENT_COUNTING: {
      const counting = action.payload;
      const newCounting = state.counting + counting;
      return { counting: newCounting };
    }
    case CountingKeys.DECREMENT_COUNTING: {
      const counting = action.payload;
      const newCounting = state.counting - counting;
      return { counting: newCounting };
    }
    default:
      return state;
  }
}
