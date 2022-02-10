import { createReducerFunction, ImmerReducer } from "immer-reducer";
import { IFullWord } from "./words";

export interface IWordsState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  errorMsg: string;
  cardsToTraining: IFullWord[];
  answers: string[];
}

const initialState: IWordsState = {
  cardsToTraining: [],
  answers: [],
  isPending: false,
  isResolved: false,
  isRejected: false,
  errorMsg: "",
};

export class TrainingReducer extends ImmerReducer<IWordsState> {
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

  public setCardsToTraining(cards: IFullWord[]) {
    this.draftState.cardsToTraining = cards;
  }
  public setAnswers(answers: string[]) {
    this.draftState.answers = answers;
  }
}

export default createReducerFunction(TrainingReducer, initialState);
