import { createReducerFunction, ImmerReducer } from "immer-reducer";

export interface IUser {
  email: string | null;
}

export interface IUserState extends Partial<IUser> {
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  isLoggedIn: false,
  email: null,
};

export class UserReducer extends ImmerReducer<IUserState> {
  public setIsLoggedIn() {
    this.draftState.isLoggedIn = true;
  }

  public setIsLoggedOut() {
    this.draftState.isLoggedIn = false;
  }

  public setUser(user: IUser) {
    this.draftState.email = user.email;
  }
}

export default createReducerFunction(UserReducer, initialState);
