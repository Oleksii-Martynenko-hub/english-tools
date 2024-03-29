import { createActionCreators } from "immer-reducer";
import { IWord, WordsReducer } from "@/store/reducers/words";
import { AsyncAction } from "./common";
import { IGetPartBody } from "@/api/main-protected";

export const wordsActions = createActionCreators(WordsReducer);

export type WordsActions =
  | ReturnType<typeof wordsActions.setIsGetTranslatePending>
  | ReturnType<typeof wordsActions.setIsPending>
  | ReturnType<typeof wordsActions.setIsResolved>
  | ReturnType<typeof wordsActions.setIsRejected>
  | ReturnType<typeof wordsActions.setIsAllLoaded>
  | ReturnType<typeof wordsActions.setErrorMsg>
  | ReturnType<typeof wordsActions.setTranslate>
  | ReturnType<typeof wordsActions.setWordsList>;

export const getWordsListAsync =
  (body?: IGetPartBody): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsPending());

      const { data } = await mainApiProtected.getWordsList(body);

      dispatch(wordsActions.setWordsList(data, body?.offset || 0));

      if (data.length < 5) dispatch(wordsActions.setIsAllLoaded(true));

      dispatch(wordsActions.setIsResolved());
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };

export const addWordAsync =
  (word: IWord): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsPending());

      await mainApiProtected.postNewWord(word);

      dispatch(getWordsListAsync());

      dispatch(wordsActions.setIsResolved());
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };

export const getTranslateOfWordAsync =
  (text: string): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsGetTranslatePending(true));

      const { data } = await mainApiProtected.postTranslate({ text });

      dispatch(wordsActions.setTranslate(data.translate));
      dispatch(wordsActions.setIsGetTranslatePending(false));
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };

export const editWordAsync =
  (id: number, word: IWord): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsPending());

      await mainApiProtected.putEditWord({ id, input: word });

      dispatch(getWordsListAsync());

      dispatch(wordsActions.setIsResolved());
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };

export const removeWordAsync =
  (id: number): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsPending());

      await mainApiProtected.deleteWord({ id });

      dispatch(getWordsListAsync());

      dispatch(wordsActions.setIsResolved());
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };
