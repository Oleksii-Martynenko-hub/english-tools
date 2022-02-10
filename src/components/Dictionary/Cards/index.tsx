import React, { useEffect, useState } from "react";
import { Button, Col, Tabs, Tab, Card, ListGroup, Row } from "react-bootstrap";
import { DeleteOutlined } from "@ant-design/icons";

import AddCard from "./AddCard";
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

const Cards: React.FC = () => {
  const dispatch = useDispatch();

  const cards = useSelector(selectWordsList);

  useEffect(() => {
    dispatch(getWordsListAsync());
  }, []);

  return (
    <Card
      style={{
        overflow: "hidden scroll",
        height: "calc(100vh - 160px)",
        borderTop: "none",
        borderRadius: 0,
      }}
    >
      <ListGroup variant="flush">
        <ListGroup.Item key="new-word" className="p-2">
          <AddCard />
        </ListGroup.Item>

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
