import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import MainApi from "@/api/main";
import MainApiProtected from "@/api/main-protected";

import { LoginActions } from "./actions/login";
import loginReducer from "./reducers/login";

import { UserActions } from "./actions/user";
import userReducer from "./reducers/user";

import { WordsActions } from "./actions/words";
import wordsReducer from "./reducers/words";

import { CollectionsActions } from "./actions/collections";
import collectionsReducer from "./reducers/collections";

import { RestoreAuthActions } from "./actions/restore-auth";
import restoreAuthReducer from "./reducers/restore-auth";

import { TrainingActions } from "./actions/training";
import trainingReducer from "./reducers/training";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  loginReducer,
  restoreAuthReducer,
  userReducer,
  wordsReducer,
  collectionsReducer,
  trainingReducer,
});

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // @ts-ignore
      trace: true,
      traceLimit: 25,
    })) ||
  compose;

const mainApi = MainApi.getInstance();
const mainApiProtected = MainApiProtected.getInstance();

export const apis = {
  mainApi,
  mainApiProtected,
};

const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(apis))
);

export type State = ReturnType<typeof rootReducer>;
export type Actions =
  | LoginActions
  | RestoreAuthActions
  | UserActions
  | WordsActions
  | CollectionsActions
  | TrainingActions;

export default createStore(rootReducer, enhancer);
