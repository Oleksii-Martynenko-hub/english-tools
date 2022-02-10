import { createActionCreators } from 'immer-reducer';
import { UserReducer } from '@/store/reducers/user';
import Tokens from '@/utils/local-storage/tokens';
import { AsyncAction } from './common';

export const userActions = createActionCreators(UserReducer);

export type UserActions =
  | ReturnType<typeof userActions.setIsLoggedIn>
  | ReturnType<typeof userActions.setIsLoggedOut>
  | ReturnType<typeof userActions.setUser>;

export const logoutAsync = (): AsyncAction => async (dispatch) => {
  const tokens = Tokens.getInstance();

  tokens.clear();

  dispatch(userActions.setIsLoggedOut());
};
