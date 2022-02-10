import { createSelector, Selector } from 'reselect';
import { State } from '@/store';

const selectRestoreAuthReducer = (state: State) => state.restoreAuthReducer;

export const selectIsRestoreAuthPending: Selector<State, boolean> = createSelector(
  selectRestoreAuthReducer,
  ({ isPending }) => isPending,
);

export const selectIsRestoreAuthResolved: Selector<State, boolean> = createSelector(
  selectRestoreAuthReducer,
  ({ isResolved }) => isResolved,
);

export const selectIsRestoreAuthRejected: Selector<State, boolean> = createSelector(
  selectRestoreAuthReducer,
  ({ isRejected }) => isRejected,
);
