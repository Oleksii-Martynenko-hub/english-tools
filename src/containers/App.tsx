import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";
import { Col, Container, Row } from "react-bootstrap";
import "reset-css";
import "bootstrap/dist/css/bootstrap.min.css";

import store, { history } from "@/store";
import { restoreAuthAsync } from "@/store/actions/restore-auth";

import ProtectedRouter from "@/components/common/ProtectedRouter";
import Background from "@/components/common/Background";
import Logo from "@/components/common/Logo";
import Navigation from "@/components/common/Navigation";

import Login from "@/containers/Login";
import Home from "@/containers/Home";

export const theme = {
  palette: {
    primary: "#34495E",
    primaryActive: "#2C3E50",
    primaryInActive: "#95A5A6",
    body: "#ECF0F1",
    green: "#2B4F2D",
    red: "#6D3739",
    orange: "#E39E21",
  },
};

const GlobalStyle = createGlobalStyle`
  ${normalize};

  html,
      body,
      #root {
        width: 100%;
        height: 100%;
      }

  * {
    box-sizing: border-box;

    &:disabled{
      -webkit-appearance: none;
      opacity:1;
    }
  }

  body {
    background-color: ${theme.palette.body};
  }

  input, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export enum Routes {
  ROOT = "/",
  CHECK = "/check",
  LOGIN = "/login",
  DICTIONARY = "/dictionary",
  DICTIONARY_CARDS = "/dictionary/cards",
  DICTIONARY_DECKS = "/dictionary/decks",
  TRAINING_CAMP = "/training_camp",
  PROFILE = "/profile",
}

store.dispatch<any>(restoreAuthAsync());

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Switch>
            <Redirect from={Routes.CHECK} to={Routes.LOGIN} exact />
            <Route path={Routes.LOGIN} component={Login} exact />
            <ProtectedRouter path={Routes.ROOT} component={Home} />
            <Redirect from="*" to={Routes.CHECK} exact />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
