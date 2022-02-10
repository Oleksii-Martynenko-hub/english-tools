import { createActionCreators } from "immer-reducer";
import { IWord, WordsReducer } from "@/store/reducers/words";
import Tokens from "@/utils/local-storage/tokens";
import { AsyncAction } from "./common";
import { IGetPartBody } from "@/api/main-protected";
import { useSelector } from "react-redux";
import { selectWordsList } from "../selectors/words";
import { CollectionsReducer, ICollection } from "../reducers/collections";
import {
  selectCollectionsList,
  selectCollectionsListWithCards,
  selectCollectionWithCards,
} from "../selectors/collections";

export const collectionsActions = createActionCreators(CollectionsReducer);

export type CollectionsActions =
  | ReturnType<typeof collectionsActions.setIsPending>
  | ReturnType<typeof collectionsActions.setIsResolved>
  | ReturnType<typeof collectionsActions.setIsRejected>
  | ReturnType<typeof collectionsActions.setErrorMsg>
  | ReturnType<typeof collectionsActions.setActiveCollectionId>
  | ReturnType<typeof collectionsActions.setCollectionsList>
  | ReturnType<typeof collectionsActions.setCollectionsWithCards>;

export const getCollectionsListAsync =
  (body?: IGetPartBody): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data } = await mainApiProtected.getCollectionsList(body);

      dispatch(
        collectionsActions.setCollectionsList(
          data.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        )
      );
      dispatch(collectionsActions.setActiveCollectionId(data[0].id));
      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };

export const addCollectionAsync =
  (collection: ICollection): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data: newCollection } = await mainApiProtected.postNewCollection(
        collection
      );

      await dispatch(getCollectionsListAsync());

      dispatch(collectionsActions.setActiveCollectionId(newCollection.id));

      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };

export const editCollectionAsync =
  (id: number, collection: ICollection): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data: changedCollection } =
        await mainApiProtected.putEditCollection({
          id,
          input: collection,
        });

      await dispatch(getCollectionsListAsync());

      dispatch(collectionsActions.setActiveCollectionId(id));

      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };

export const removeCollectionAsync =
  (id: number): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data: deletedCollection } =
        await mainApiProtected.deleteCollection({
          id,
        });

      await dispatch(getCollectionsListAsync());

      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };

export const getCollectionWithCardsAsync =
  (id: number, body?: IGetPartBody): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data } = await mainApiProtected.getCollectionWithCards(id, body);

      dispatch(collectionsActions.setCollectionsWithCards([data]));
      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };

export const addCardsToCollectionAsync =
  (id: number, cardIds: number[]): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data: collection } = await mainApiProtected.postCardsToCollection(
        {
          id,
          cardIds,
        }
      );

      await dispatch(getCollectionsListAsync());
      await dispatch(getCollectionWithCardsAsync(id));

      dispatch(collectionsActions.setActiveCollectionId(id));
      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };

export const removeCardsFromCollectionAsync =
  (id: number, cardIds: number[]): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(collectionsActions.setIsPending());

      const { data: collection } =
        await mainApiProtected.deleteCardsFromCollection({
          id,
          cardIds,
        });

      await dispatch(getCollectionsListAsync());
      await dispatch(getCollectionWithCardsAsync(id));

      dispatch(collectionsActions.setActiveCollectionId(id));
      dispatch(collectionsActions.setIsResolved());
    } catch (e) {
      dispatch(collectionsActions.setIsRejected());
    }
  };
