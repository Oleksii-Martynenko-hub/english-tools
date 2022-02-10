import { createActionCreators } from "immer-reducer";
import { UserReducer } from "@/store/reducers/user";
import Tokens from "@/utils/local-storage/tokens";
import { AsyncAction } from "./common";
import { TrainingReducer } from "../reducers/training";
import MainApiProtected, { IGetPartBody } from "@/api/main-protected";

export const trainingActions = createActionCreators(TrainingReducer);

export type TrainingActions =
  | ReturnType<typeof trainingActions.setIsPending>
  | ReturnType<typeof trainingActions.setIsRejected>
  | ReturnType<typeof trainingActions.setIsResolved>
  | ReturnType<typeof trainingActions.setErrorMsg>
  | ReturnType<typeof trainingActions.setCardsToTraining>
  | ReturnType<typeof trainingActions.setAnswers>;

export const getCardsForTrainingAsync =
  (collectionId?: number, body?: IGetPartBody): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      const { data } = await mainApiProtected.getCardsForTraining(
        collectionId,
        body
      );

      dispatch(trainingActions.setCardsToTraining(data));

      const getWords = async (arr?: string[]): Promise<string[]> => {
        const arrayOfData: string[] = arr ? [...arr] : [];
        const count = 10 - arrayOfData.length;

        arrayOfData.push(
          (await mainApiProtected.getRandomWord({ word: data[0].word })).data
        );

        const unique = arrayOfData.filter((v, i, a) => a.indexOf(v) === i);

        if (unique.length >= 10) {
          console.log("🚀 ~ getWords ~ unique", unique);
          return new Promise(() => unique);
        }

        return await getWords(unique);
      };

      const answers = await getWords();
      console.log("🚀 ~ answers", answers);

      dispatch(trainingActions.setAnswers(answers));

      dispatch(trainingActions.setIsResolved());
      return data;
    } catch (e) {
      dispatch(trainingActions.setIsRejected());
    }
  };

export const getRandomWordAsync =
  (word: string): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      const getWords = async (arr?: string[]): Promise<string[]> => {
        const arrayOfData: string[] = arr ? [...arr] : [];
        const count = 20 - arrayOfData.length;

        arrayOfData.push(
          ...(await Promise.all(
            new Array(count).map(async () => {
              return (await mainApiProtected.getRandomWord({ word })).data;
            })
          ))
        );

        const unique = arrayOfData.filter((v, i, a) => a.indexOf(v) === i);

        if (unique.length < 20) {
          return getWords(unique);
        }

        return new Promise(() => arrayOfData);
      };

      const data = await getWords();

      dispatch(trainingActions.setIsResolved());
    } catch (e) {
      dispatch(trainingActions.setIsRejected());
    }
  };

export const updateLearnedCardsAsync =
  (cardIds: number[], collectionId?: number): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      const { data } = await mainApiProtected.putCardsAfterTraining({
        collectionId,
        cardIds,
      });

      dispatch(trainingActions.setIsResolved());
      return data;
    } catch (e) {
      dispatch(trainingActions.setIsRejected());
    }
  };
