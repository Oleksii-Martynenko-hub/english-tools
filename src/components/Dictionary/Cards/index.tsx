import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Tabs, Tab, Card, ListGroup, Row } from "react-bootstrap";
import { DeleteOutlined, SyncOutlined } from "@ant-design/icons";

import AddCard from "./AddCard";
import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";
import {
  editWordAsync,
  getWordsListAsync,
  removeWordAsync,
} from "@/store/actions/words";
import {
  selectIsAllWordsLoaded,
  selectIsWordsPending,
  selectWordsList,
} from "@/store/selectors/words";
import { getCollectionWithCardsAsync } from "@/store/actions/collections";
import { selectCollectionWithCards } from "@/store/selectors/collections";
import useObserver from "@/components/common/hooks/useObserver";
import styled, { keyframes } from "styled-components";

const Cards: React.FC = () => {
  const dispatch = useDispatch();

  const cards = useSelector(selectWordsList);
  const isPending = useSelector(selectIsWordsPending);
  const isAllLoaded = useSelector(selectIsAllWordsLoaded);

  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);

  const observerRef = useRef<HTMLDivElement>(null);
  const visible = useObserver(observerRef, "-10px");

  useEffect(() => {
    if (!isAllLoaded && visible) {
      dispatch(getWordsListAsync({ offset, limit }));
      setOffset(offset + limit);
    }
  }, [visible]);

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
          // .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
          .map((card) => (
            <ListGroup.Item key={card.id} className="p-2">
              <CardItem card={card} />
            </ListGroup.Item>
          ))}

        <div
          ref={observerRef}
          style={{
            textAlign: "center",
            width: "100%",
            opacity: visible && isPending ? 1 : 0,
            fontSize: "3px",
          }}
        >
          <Loader />
        </div>
      </ListGroup>
    </Card>
  );
};

const loading = keyframes`
  0%,
  100% {
    box-shadow: -3.75em -1em 0 0em, -2.25em -1em 0 -1em, -0.75em -1em 0 -1em, 0.75em -1em 0 -1em, 2.25em -1em 0 -1em, 3.75em -1em 0 -1em;
  }
  12.5% {
    box-shadow: -3.75em -1em 0 0.2em, -2.25em -1em 0 0, -0.75em -1em 0 -1em, 0.75em -1em 0 -1em, 2.25em -1em 0 -1em, 3.75em -1em 0 -1em;
  }
  25% {
    box-shadow: -3.75em -1em 0 0, -2.25em -1em 0 0.2em, -0.75em -1em 0 0, 0.75em -1em 0 -1em, 2.25em -1em 0 -1em, 3.75em -1em 0 -1em;
  }
  37.5% {
    box-shadow: -3.75em -1em 0 -1em, -2.25em -1em 0 0, -0.75em -1em 0 0.2em, 0.75em -1em 0 0em, 2.25em -1em 0 -1em, 3.75em -1em 0 -1em;
  }
  50% {
    box-shadow: -3.75em -1em 0 -1em, -2.25em -1em 0 -1em, -0.75em -1em 0 0em, 0.75em -1em 0 0.2em, 2.25em -1em 0 0, 3.75em -1em 0 -1em;
  }
  62.5% {
    box-shadow: -3.75em -1em 0 -1em, -2.25em -1em 0 -1em, -0.75em -1em 0 -1em, 0.75em -1em 0 0, 2.25em -1em 0 0.2em, 3.75em -1em 0 0;
  }
  75% {
    box-shadow: -3.75em -1em 0 -1em, -2.25em -1em 0 -1em, -0.75em -1em 0 -1em, 0.75em -1em 0 -1em, 2.25em -1em 0 0, 3.75em -1em 0 0.2em;
  }
  87.5% {
    box-shadow: -3.75em -1em 0 -1em, -2.25em -1em 0 -1em, -0.75em -1em 0 -1em, 0.75em -1em 0 -1em, 2.25em -1em 0 0, 3.75em -1em 0 0;
  }
`;

const Loader = styled.div`
  border-radius: 50%;
  width: 0.4em;
  height: 0.4em;
  font-size: 16px;
  color: #000;
  margin: 32px auto 0;
  position: relative;
  transform: translateZ(0);
  animation-fill-mode: both;
  animation: ${loading} 0.6s infinite linear;
`;

export default Cards;
