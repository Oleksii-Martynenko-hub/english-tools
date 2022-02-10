import { createSelector, Selector } from "reselect";
import { State } from "@/store";

export const selectUserReducer = (state: State) => state.userReducer;

export const selectIsLoggedIn: Selector<State, boolean> = createSelector(
  selectUserReducer,
  ({ isLoggedIn }) => isLoggedIn
);

export const selectEmail: Selector<State, string | null | undefined> =
  createSelector(selectUserReducer, ({ email }) => email);
