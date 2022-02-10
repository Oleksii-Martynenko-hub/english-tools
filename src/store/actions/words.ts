import { createActionCreators } from "immer-reducer";
import { IWord, WordsReducer } from "@/store/reducers/words";
import Tokens from "@/utils/local-storage/tokens";
import { AsyncAction } from "./common";
import { IGetPartBody } from "@/api/main-protected";
import { useSelector } from "react-redux";
import { selectWordsList } from "../selectors/words";

export const wordsActions = createActionCreators(WordsReducer);

export type WordsActions =
  | ReturnType<typeof wordsActions.setIsPending>
  | ReturnType<typeof wordsActions.setIsResolved>
  | ReturnType<typeof wordsActions.setIsRejected>
  | ReturnType<typeof wordsActions.setErrorMsg>
  | ReturnType<typeof wordsActions.setWordsList>;

export const getWordsListAsync =
  (body?: IGetPartBody): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsPending());

      const { data } = await mainApiProtected.getWordsList(body);

      dispatch(wordsActions.setWordsList(data));
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

      // const { data: translate } = await mainApiProtected.postTranslate({
      //   text: word.word,
      // });
      // console.log("🚀 ~ translate", translate);
      const { data: newWord } = await mainApiProtected.postNewWord(word);

      dispatch(getWordsListAsync());

      dispatch(wordsActions.setIsResolved());
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };

export const editWordAsync =
  (id: number, word: IWord): AsyncAction =>
  async (dispatch, _, { mainApiProtected }) => {
    try {
      dispatch(wordsActions.setIsPending());

      const { data: changedWord } = await mainApiProtected.putEditWord({
        id,
        input: word,
      });

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

      const { data: changedWord } = await mainApiProtected.deleteWord({ id });

      dispatch(getWordsListAsync());

      dispatch(wordsActions.setIsResolved());
    } catch (e) {
      dispatch(wordsActions.setIsRejected());
    }
  };
