import { createSelector, Selector } from "reselect";
import { State } from "@/store";
import { IFullWord } from "../reducers/words";

export const selectWordsReducer = (state: State) => state.wordsReducer;

export const selectIsWordsPending: Selector<State, boolean> = createSelector(
  selectWordsReducer,
  ({ isPending }) => isPending
);

export const selectIsWordsResolved: Selector<State, boolean> = createSelector(
  selectWordsReducer,
  ({ isResolved }) => isResolved
);

export const selectIsWordsRejected: Selector<State, boolean> = createSelector(
  selectWordsReducer,
  ({ isRejected }) => isRejected
);

export const selectIsAllWordsLoaded: Selector<State, boolean> = createSelector(
  selectWordsReducer,
  ({ isAllLoaded }) => isAllLoaded
);

export const selectWordsErrorMsg: Selector<State, string> = createSelector(
  selectWordsReducer,
  ({ errorMsg }) => errorMsg
);

export const selectWordsList: Selector<State, IFullWord[]> = createSelector(
  selectWordsReducer,
  ({ wordsList }) => wordsList
);

export const selectTranslate: Selector<State, string | null> = createSelector(
  selectWordsReducer,
  ({ translate }) => translate
);

export const selectIsGetTranslatePending: Selector<State, boolean> =
  createSelector(
    selectWordsReducer,
    ({ isGetTranslatePending }) => isGetTranslatePending
  );
