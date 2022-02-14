import { createReducerFunction, ImmerReducer } from "immer-reducer";
import { IFullWord } from "./words";

export interface ICollection {
  name: string;
}

export interface IFullCollection extends ICollection {
  userId: number;
  createdAt: Date;
  id: number;
}

export interface ICollectionWithCards extends IFullCollection {
  cards?: IFullWord[];
}

export interface ICollectionsState {
  isPending: boolean;
  isResolved: boolean;
  isRejected: boolean;
  errorMsg: string;
  collectionsList: IFullCollection[];
  collectionsWithCards: ICollectionWithCards[];
  activeCollectionId: number | undefined;
}

const initialState: ICollectionsState = {
  activeCollectionId: undefined,
  collectionsList: [],
  collectionsWithCards: [],
  isPending: false,
  isResolved: false,
  isRejected: false,
  errorMsg: "",
};

export class CollectionsReducer extends ImmerReducer<ICollectionsState> {
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

  public setCollectionsList(collections: IFullCollection[]) {
    this.draftState.collectionsList = collections;
  }

  public setActiveCollectionId(id: number | undefined) {
    this.draftState.activeCollectionId = id;
  }

  public setCollectionsWithCards(collections: ICollectionWithCards[]) {
    const isExisting = this.draftState.collectionsWithCards.find(
      (c) => c.id === collections[0].id
    );

    this.draftState.collectionsWithCards = !!isExisting
      ? [
          ...this.draftState.collectionsWithCards.map((c) =>
            c.id === collections[0].id ? collections[0] : c
          ),
        ]
      : [...this.draftState.collectionsWithCards, ...collections];
  }
}

export default createReducerFunction(CollectionsReducer, initialState);
