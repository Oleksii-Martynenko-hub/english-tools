import { createReducerFunction, ImmerReducer } from "immer-reducer";

export interface ILoginState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  errorMsg: string;
}

const initialState: ILoginState = {
  isPending: false,
  isResolved: false,
  isRejected: false,
  errorMsg: "",
};

export class LoginReducer extends ImmerReducer<ILoginState> {
  public setIsPending() {
    this.draftState.isPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
    this.draftState.errorMsg = "";
  }

  public setIsResolved() {
    this.draftState.isPending = false;
    this.draftState.isResolved = true;
  }

  public setIsRejected() {
    this.draftState.isPending = false;
    this.draftState.isRejected = true;
  }

  public setErrorMsg(msg?: string) {
    if (typeof msg === "string") {
      this.draftState.errorMsg = msg;
      return;
    }
    console.log(msg);

    this.draftState.errorMsg = "Something went wrong :(";
  }
}

export default createReducerFunction(LoginReducer, initialState);
