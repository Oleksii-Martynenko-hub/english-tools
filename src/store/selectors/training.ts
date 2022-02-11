import { createSelector, Selector } from "reselect";
import { State } from "@/store";
import { IFullWord } from "../reducers/words";

export const selectTrainingReducer = (state: State) => state.trainingReducer;

export const selectIsTrainingPending: Selector<State, boolean> = createSelector(
  selectTrainingReducer,
  ({ isPending }) => isPending
);

export const selectIsGetCardsToTrainingPending: Selector<State, boolean> =
  createSelector(
    selectTrainingReducer,
    ({ isGetCardsToTrainingPending }) => isGetCardsToTrainingPending
  );

export const selectIsGetAnswersPending: Selector<State, boolean> =
  createSelector(
    selectTrainingReducer,
    ({ isGetAnswersPending }) => isGetAnswersPending
  );

export const selectIsTrainingResolved: Selector<State, boolean> =
  createSelector(selectTrainingReducer, ({ isResolved }) => isResolved);

export const selectIsTrainingRejected: Selector<State, boolean> =
  createSelector(selectTrainingReducer, ({ isRejected }) => isRejected);

export const selectTrainingErrorMsg: Selector<State, string> = createSelector(
  selectTrainingReducer,
  ({ errorMsg }) => errorMsg
);

export const selectCardsToTraining: Selector<State, IFullWord[]> =
  createSelector(
    selectTrainingReducer,
    ({ cardsToTraining }) => cardsToTraining
  );

export const selectAnswers: Selector<State, string[]> = createSelector(
  selectTrainingReducer,
  ({ answers }) => answers
);

export const selectCurrentCard: Selector<State, IFullWord | null> =
  createSelector(selectTrainingReducer, ({ currentCard }) => currentCard);
