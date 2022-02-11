import { createReducerFunction, ImmerReducer } from "immer-reducer";
import { IFullWord } from "./words";

export interface IWordsState {
  isGetCardsToTrainingPending: boolean;
  isGetAnswersPending: boolean;
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  errorMsg: string;
  cardsToTraining: IFullWord[];
  currentCard: IFullWord | null;
  answers: string[];
}

const initialState: IWordsState = {
  cardsToTraining: [],
  currentCard: null,
  answers: [],
  isGetCardsToTrainingPending: false,
  isGetAnswersPending: false,
  isPending: false,
  isResolved: true,
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

  public setIsGetCardsToTrainingPending() {
    this.draftState.isGetCardsToTrainingPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
    this.draftState.errorMsg = "";
  }

  public setIsGetAnswersPending() {
    this.draftState.isGetAnswersPending = true;
    this.draftState.isResolved = false;
    this.draftState.isRejected = false;
    this.draftState.errorMsg = "";
  }

  public setIsResolved() {
    this.draftState.isPending = false;
    this.draftState.isGetCardsToTrainingPending = false;
    this.draftState.isGetAnswersPending = false;
    this.draftState.isResolved = true;
  }

  public setIsRejected() {
    this.draftState.isPending = false;
    this.draftState.isGetCardsToTrainingPending = false;
    this.draftState.isGetAnswersPending = false;
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

  public setCurrentCard(card: IFullWord | null) {
    this.draftState.currentCard = card;
  }

  public setAnswers(answers: string[]) {
    this.draftState.answers = answers;
  }
}

export default createReducerFunction(TrainingReducer, initialState);
