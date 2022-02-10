import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Tabs,
  Tab,
  Card,
  ListGroup,
  Row,
  Nav,
} from "react-bootstrap";
import { DeleteOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";

import Cards from "./Cards";
import Decks from "./Decks";
import { Route, Switch } from "react-router";
import { Routes } from "@/containers/App";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Dictionary: React.FC = () => {
  return (
    <div className="mw-100">
      <h2 className="fs-2">Dictionary</h2>

      {/* <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <NavLink to={Routes.DICTIONARY_CARDS}>Cards</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={Routes.DICTIONARY_DECKS}>Decks</NavLink>
        </Nav.Item>
      </Nav>

      <div>
        <Switch>
          <Route path={Routes.DICTIONARY_CARDS} component={Cards} exact />
          <Route path={Routes.DICTIONARY_DECKS} component={Decks} exact />
        </Switch>
      </div> */}

      <Tabs defaultActiveKey="cards" className="mb-0">
        <Tab eventKey="cards" title="Cards">
          <Cards />
        </Tab>
        <Tab eventKey="decks" title="Decks">
          <Decks />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dictionary;

const DictionaryStyled = styled.div`
  min-width: 100%;
`;
