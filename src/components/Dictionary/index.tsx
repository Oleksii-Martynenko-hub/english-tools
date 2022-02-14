import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import styled from "styled-components";

import Cards from "./Cards";
import Decks from "./Decks";

const Dictionary: React.FC = () => {
  return (
    <div className="mw-100">
      <h2 className="fs-2">Dictionary</h2>

      <Tabs
        mountOnEnter
        unmountOnExit
        defaultActiveKey="cards"
        className="mb-0"
      >
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
