import { createReducerFunction, ImmerReducer } from "immer-reducer";

export interface IWord {
  word: string;
  translate: string;
  context?: string;
  homeURL?: string;
}

export interface IFullWord extends IWord {
  userId: number;
  createdAt: string;
  countUses: number;
  studyFrom: string;
  id: number;
}

export interface IWordsState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  errorMsg: string;
  wordsList: IFullWord[];
}

const initialState: IWordsState = {
  wordsList: [],
  isPending: false,
  isResolved: false,
  isRejected: false,
  errorMsg: "",
};

export class WordsReducer extends ImmerReducer<IWordsState> {
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

  public setWordsList(words: IFullWord[]) {
    this.draftState.wordsList = words;
  }
}

export default createReducerFunction(WordsReducer, initialState);
