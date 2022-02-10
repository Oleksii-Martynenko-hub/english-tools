import React, { ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";
import { Col, Container, Row } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import store, { history } from "@/store";
import { restoreAuthAsync } from "@/store/actions/restore-auth";

import ProtectedRouter from "@/components/common/ProtectedRouter";
import Background from "@/components/common/Background";
import Logo from "@/components/common/Logo";
import Navigation from "@/components/common/Navigation";

interface Props {
  nav?: ReactElement;
}

const PageWrap: React.FC<Props> = ({ nav, children }) => {
  const location = useLocation();

  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    setIsLoginPage(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <Container fluid style={{ padding: 0, height: "100%" }}>
      <Background />

      <Row className="m-0 g-0 h-100">
        <Col
          className={`p-${isLoginPage ? "4" : "3"} d-flex ${
            isLoginPage
              ? "justify-content-center align-items-center"
              : "flex-column"
          }`}
          style={{
            background: `rgba(255,255,255,0.${isLoginPage ? "65" : "8"})`,
            flex: isLoginPage ? "0 0 50%" : "0 0 170px",
            transition: "all 0.2s",
          }}
        >
          <Logo sizePercent={isLoginPage ? 100 : 57.9} />
          {!isLoginPage && (
            <>
              <div className="my-3 w-100 bg-dark" style={{ height: 1 }}></div>
              {nav}
            </>
          )}
        </Col>

        <Col
          className={`p-4 h-100 d-flex ${
            isLoginPage
              ? "justify-content-center align-items-center"
              : "flex-column"
          }`}
          style={{
            background: `rgba(0,0,0,0.${isLoginPage ? "65" : "8"})`,
            overflow: "hidden auto",
            transition: "all 0.2s",
          }}
        >
          <Container
            fluid
            className="p-3 "
            style={{
              borderRadius: "8px",
              background: "#ffffffee",
              minHeight: 300,
              height: "100%",
            }}
          >
            {children}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PageWrap;
