import { createActionCreators } from "immer-reducer";
import { LoginReducer } from "@/store/reducers/login";
import Tokens from "@/utils/local-storage/tokens";
import { AsyncAction } from "./common";
import { userActions } from "./user";

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions =
  | ReturnType<typeof loginActions.setIsPending>
  | ReturnType<typeof loginActions.setIsResolved>
  | ReturnType<typeof loginActions.setIsRejected>
  | ReturnType<typeof loginActions.setErrorMsg>;

export const loginAsync =
  (email: string, password: string): AsyncAction =>
  async (dispatch, _, { mainApi }) => {
    try {
      dispatch(loginActions.setIsPending());

      const tokens = Tokens.getInstance();

      const { data, status, message } = await mainApi.login({
        email,
        password,
      });

      if (status !== 200) dispatch(loginActions.setErrorMsg(message));

      const { accessToken, refreshToken } = data;

      tokens.setAccessToken(accessToken);
      tokens.setRefreshToken(refreshToken);

      dispatch(loginActions.setIsResolved());
      dispatch(userActions.setIsLoggedIn());
    } catch (e: any) {
      dispatch(loginActions.setErrorMsg(e.message));
      dispatch(loginActions.setIsRejected());
    }
  };

export const signupAsync =
  (email: string, password: string): AsyncAction =>
  async (dispatch, _, { mainApi }) => {
    try {
      dispatch(loginActions.setIsPending());

      const { status, message } = await mainApi.signup({
        email,
        password,
      });

      if (status !== 200) throw new Error(message);

      dispatch(loginActions.setIsResolved());
      dispatch(userActions.setIsLoggedIn());
    } catch (e: any) {
      dispatch(loginActions.setErrorMsg(e.message));
      dispatch(loginActions.setIsRejected());
    }
  };
