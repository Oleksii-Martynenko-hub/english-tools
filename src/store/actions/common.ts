import { ThunkAction } from 'redux-thunk';
import { CallHistoryMethodAction } from 'connected-react-router';
import { State, Actions, apis } from '@/store';

type HistoryActions = CallHistoryMethodAction<[string, unknown?]>;

export type AsyncAction<R = void> = ThunkAction<R, State, typeof apis, Actions | HistoryActions>;
