import React, { useEffect, useState } from "react";
import { Button, Col, Tabs, Tab, Card, ListGroup, Row } from "react-bootstrap";
import { DeleteOutlined } from "@ant-design/icons";

import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";
import {
  editWordAsync,
  getWordsListAsync,
  removeWordAsync,
} from "@/store/actions/words";
import { selectWordsList } from "@/store/selectors/words";
import { getCollectionWithCardsAsync } from "@/store/actions/collections";
import { selectCollectionWithCards } from "@/store/selectors/collections";
import { IFullWord } from "@/store/reducers/words";

interface Props {
  cards: IFullWord[];
}

const Cards: React.FC<Props> = ({ cards }) => {
  return (
    <Card
      style={{
        overflow: "hidden scroll",
        height: "calc(100vh - 248px)",
        borderTop: "none",
        borderRadius: 0,
      }}
    >
      <ListGroup variant="flush">
        {[...cards]
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
          .map((card) => (
            <ListGroup.Item key={card.id} className="p-2">
              <CardItem card={card} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default Cards;
