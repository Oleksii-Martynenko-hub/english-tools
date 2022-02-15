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
  isGetTranslatePending: boolean;
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  errorMsg: string;
  translate: string | null;
  wordsList: IFullWord[];
}

const initialState: IWordsState = {
  isGetTranslatePending: false,
  wordsList: [],
  translate: null,
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

  public setIsGetTranslatePending(is: boolean) {
    this.draftState.isGetTranslatePending = is;
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

  public setTranslate(translate: string | null) {
    this.draftState.translate = translate;
  }
}

export default createReducerFunction(WordsReducer, initialState);
