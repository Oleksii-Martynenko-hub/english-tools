import { createActionCreators } from "immer-reducer";
import { UserReducer } from "@/store/reducers/user";
import Tokens from "@/utils/local-storage/tokens";
import { AsyncAction } from "./common";
import { TrainingReducer } from "../reducers/training";
import MainApiProtected, { IGetPartBody } from "@/api/main-protected";

export const trainingActions = createActionCreators(TrainingReducer);

export type TrainingActions =
  | ReturnType<typeof trainingActions.setIsPending>
  | ReturnType<typeof trainingActions.setIsGetCardsToTrainingPending>
  | ReturnType<typeof trainingActions.setIsGetAnswersPending>
  | ReturnType<typeof trainingActions.setIsRejected>
  | ReturnType<typeof trainingActions.setIsResolved>
  | ReturnType<typeof trainingActions.setErrorMsg>
  | ReturnType<typeof trainingActions.setCardsToTraining>
  | ReturnType<typeof trainingActions.setCurrentCard>
  | ReturnType<typeof trainingActions.setAnswers>;

export const getCardsForTrainingAsync =
  (collectionId?: number, body?: IGetPartBody): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(trainingActions.setIsGetCardsToTrainingPending());

      const { data } = await mainApiProtected.getCardsForTraining(
        collectionId,
        body
      );

      dispatch(trainingActions.setCardsToTraining(data));
      if (data.length) dispatch(trainingActions.setCurrentCard(data[0]));

      dispatch(trainingActions.setIsResolved());
    } catch (e) {
      dispatch(trainingActions.setIsRejected());
    }
  };

export const getRandomWordAsync =
  (word: string): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(trainingActions.setIsGetAnswersPending());

      const { data: answer1 } = await mainApiProtected.getRandomWord({ word });
      const { data: answer2 } = await mainApiProtected.getRandomWord({ word });

      dispatch(
        trainingActions.setAnswers(
          [word, answer1, answer2].sort(() => Math.random() - Math.random())
        )
      );

      dispatch(trainingActions.setIsResolved());
    } catch (e) {
      dispatch(trainingActions.setIsRejected());
    }
  };

export const updateLearnedCardsAsync =
  (cardIds: number[], collectionId?: number): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(trainingActions.setIsPending());

      const { data } = await mainApiProtected.putCardsAfterTraining({
        collectionId,
        cardIds,
      });

      dispatch(trainingActions.setIsResolved());
    } catch (e) {
      dispatch(trainingActions.setIsRejected());
    }
  };
