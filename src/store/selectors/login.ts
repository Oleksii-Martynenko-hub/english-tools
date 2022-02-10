import { createSelector, Selector } from 'reselect';
import { State } from '@/store';

const selectLoginReducer = (state: State) => state.loginReducer;

export const selectIsLoginPending: Selector<State, boolean> = createSelector(
  selectLoginReducer,
  ({ isPending }) => isPending,
);

export const selectIsLoginResolved: Selector<State, boolean> = createSelector(
  selectLoginReducer,
  ({ isResolved }) => isResolved,
);

export const selectIsLoginRejected: Selector<State, boolean> = createSelector(
  selectLoginReducer,
  ({ isRejected }) => isRejected,
);

export const selectLoginErrorMsg: Selector<State, string> = createSelector(
  selectLoginReducer,
  ({ errorMsg }) => errorMsg,
);
