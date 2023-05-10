import {
  ICollection,
  ICollectionWithCards,
  IFullCollection,
} from "@/store/reducers/collections";
import { IFullWord, IWord } from "@/store/reducers/words";

import HttpClientProtected from "./http/http-client-protected";

interface IGetMeResponse {
  request_num: number;
  data: { email: string };
}

export interface IGetPartBody {
  limit: number;
  offset: number;
}

export default class MainApiProtected extends HttpClientProtected {
  private static classInstance?: MainApiProtected;

  private constructor() {
    super(process.env.API);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApiProtected();
    }

    return this.classInstance;
  }

  public getMe = () => this.instance.get<IGetMeResponse>("/auth/me1");

  public postRefresh = () =>
    this.instance.post<IGetMeResponse>("/auth/refresh");

  // cards
  public getWordsList = (
    params: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IFullWord[]>("/card/findAllForUser", {
      params,
    });

  public postNewWord = (body: IWord) =>
    this.instance.post<IFullWord>("/card", body);

  public putEditWord = (body: { id: number; input: IWord }) =>
    this.instance.put<IFullWord>("/card", body);

  public deleteWord = (body: { id: number }) =>
    this.instance.delete<IFullWord>("/card", { data: body });

  //collections
  public getCollectionsList = (
    params: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IFullCollection[]>("/collections/findAllForUser", {
      params,
    });

  public postNewCollection = (body: ICollection) =>
    this.instance.post<IFullCollection>("/collections", body);

  public putEditCollection = (body: { id: number; input: ICollection }) =>
    this.instance.put<IFullCollection>("/collections", body);

  public deleteCollection = (body: { id: number }) =>
    this.instance.delete<IFullCollection>("/collections", {
      data: body,
    });

  //cards & collections relation
  public getCollectionWithCards = (
    id: number,
    body: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<ICollectionWithCards>("/collections/findWithRelations", {
      params: { id, ...body },
    });

  public postCardsToCollection = (body: { id: number; cardIds: number[] }) =>
    this.instance.post<ICollectionWithCards>(
      "/collections/addCardsToCollection",
      body
    );

  public deleteCardsFromCollection = (body: {
    id: number;
    cardIds: number[];
  }) =>
    this.instance.delete<ICollectionWithCards>(
      "/collections/removeCardsFromCollection",
      { data: body }
    );

  //deepl
  public postTranslate = (body: { text: string }) =>
    this.instance.post<{ translate: string }>("/deepl/translate", body);

  //training
  public getRandomWord = (params: { word: string }) =>
    this.instance.get<string>("/training/getRandomWord", { params });

  public getCardsForTraining = (
    collectionId?: number,
    body: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IFullWord[]>("/training/getCardsForTraining", {
      params: { ...body, collectionId },
    });

  public putCardsAfterTraining = (body: {
    cardIds: number[];
    collectionId?: number;
  }) =>
    this.instance.put<IFullWord[]>("/training/updateCardsAfterTraining", body);
}
