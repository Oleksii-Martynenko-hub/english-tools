import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export interface IRestoreAuthState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
}

const initialState: IRestoreAuthState = {
  isPending: false,
  isResolved: false,
  isRejected: false,
};

export class RestoreAuthReducer extends ImmerReducer<IRestoreAuthState> {
  public setIsPending() {
    this.draftState.isPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
  }

  public setIsResolved() {
    this.draftState.isPending = false;
    this.draftState.isResolved = true;
  }

  public setIsRejected() {
    this.draftState.isPending = false;
    this.draftState.isRejected = true;
  }
}

export default createReducerFunction(RestoreAuthReducer, initialState);
