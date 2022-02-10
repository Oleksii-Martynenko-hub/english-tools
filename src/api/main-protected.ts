import {
  ICollection,
  ICollectionWithCards,
  IFullCollection,
} from "@/store/reducers/collections";
import { IUser } from "@/store/reducers/user";
import { IFullWord, IWord } from "@/store/reducers/words";

import HttpClientProtected from "./http/http-client-protected";
import { IResponse } from "./main";

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

  public getMe = () =>
    this.instance.get<IResponse<IGetMeResponse>>("/auth/me1");

  public postRefresh = () =>
    this.instance.post<IResponse<IGetMeResponse>>("/auth/refresh");

  // cards
  public getWordsList = (
    params: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IResponse<IFullWord[]>>("/card/findAllForUser", {
      params,
    });

  public postNewWord = (body: IWord) =>
    this.instance.post<IResponse<IFullWord>>("/card", body);

  public putEditWord = (body: { id: number; input: IWord }) =>
    this.instance.put<IResponse<IFullWord>>("/card", body);

  public deleteWord = (body: { id: number }) =>
    this.instance.delete<IResponse<IFullWord>>("/card", { data: body });

  //collections
  public getCollectionsList = (
    params: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IResponse<IFullCollection[]>>(
      "/collections/findAllForUser",
      { params }
    );

  public postNewCollection = (body: ICollection) =>
    this.instance.post<IResponse<IFullCollection>>("/collections", body);

  public putEditCollection = (body: { id: number; input: ICollection }) =>
    this.instance.put<IResponse<IFullCollection>>("/collections", body);

  public deleteCollection = (body: { id: number }) =>
    this.instance.delete<IResponse<IFullCollection>>("/collections", {
      data: body,
    });

  //cards & collections relation
  public getCollectionWithCards = (
    id: number,
    body: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IResponse<ICollectionWithCards>>(
      "/collections/findWithRelations",
      { params: { id, ...body } }
    );

  public postCardsToCollection = (body: { id: number; cardIds: number[] }) =>
    this.instance.post<IResponse<ICollectionWithCards>>(
      "/collections/addCardsToCollection",
      body
    );

  public deleteCardsFromCollection = (body: {
    id: number;
    cardIds: number[];
  }) =>
    this.instance.delete<IResponse<ICollectionWithCards>>(
      "/collections/removeCardsFromCollection",
      { data: body }
    );

  //deepl
  public postTranslate = (body: { text: string }) =>
    this.instance.post<IResponse<ICollectionWithCards>>(
      "/deepl/translate",
      body
    );

  //training
  public getRandomWord = (params: { word: string }) =>
    this.instance.get<IResponse<string>>("/training/getRandomWord", { params });

  public getCardsForTraining = (
    collectionId?: number,
    body: IGetPartBody | undefined = { limit: 20, offset: 0 }
  ) =>
    this.instance.get<IResponse<IFullWord[]>>("/training/getCardsForTraining", {
      params: { ...body, collectionId },
    });

  public putCardsAfterTraining = (body: {
    cardIds: number[];
    collectionId?: number;
  }) =>
    this.instance.put<IResponse<IFullWord[]>>(
      "/training/updateCardsAfterTraining",
      body
    );
}
