import { createSelector, Selector } from "reselect";
import { State } from "@/store";
import { IFullWord } from "../reducers/words";
import { ICollectionWithCards, IFullCollection } from "../reducers/collections";

export const selectCollectionsReducer = (state: State) =>
  state.collectionsReducer;

export const selectIsCollectionsPending: Selector<State, boolean> =
  createSelector(selectCollectionsReducer, ({ isPending }) => isPending);

export const selectIsCollectionsResolved: Selector<State, boolean> =
  createSelector(selectCollectionsReducer, ({ isResolved }) => isResolved);

export const selectIsCollectionsRejected: Selector<State, boolean> =
  createSelector(selectCollectionsReducer, ({ isRejected }) => isRejected);

export const selectCollectionsErrorMsg: Selector<State, string> =
  createSelector(selectCollectionsReducer, ({ errorMsg }) => errorMsg);

export const selectCollectionsList: Selector<State, IFullCollection[]> =
  createSelector(
    selectCollectionsReducer,
    ({ collectionsList }) => collectionsList
  );

export const selectActiveCollectionId: Selector<State, number | undefined> =
  createSelector(
    selectCollectionsReducer,
    ({ activeCollectionId }) => activeCollectionId
  );

export const selectCollectionsListWithCards: Selector<
  State,
  ICollectionWithCards[]
> = createSelector(
  selectCollectionsReducer,
  ({ collectionsWithCards }) => collectionsWithCards
);

export const selectCollectionWithCards: (
  id?: number
) => Selector<State, ICollectionWithCards | undefined> = (id) =>
  createSelector(selectCollectionsReducer, ({ collectionsWithCards }) =>
    collectionsWithCards.find((i) => i.id === id)
  );
