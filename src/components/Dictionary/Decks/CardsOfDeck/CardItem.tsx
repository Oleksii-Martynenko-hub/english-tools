import React, { useState } from "react";
import { Button, Col, Card, Row, Collapse } from "react-bootstrap";
import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

import EditCard from "./EditCard";
import { IFullWord } from "@/store/reducers/words";
import { useDispatch, useSelector } from "react-redux";
import { removeWordAsync } from "@/store/actions/words";
import { removeCardsFromCollectionAsync } from "@/store/actions/collections";
import { selectActiveCollectionId } from "@/store/selectors/collections";

interface Props {
  card: IFullWord;
}

const CardItem: React.FC<Props> = ({ card }) => {
  const {
    id,
    word,
    translate,
    context,
    createdAt,
    countUses,
    studyFrom,
    homeURL,
  } = card;

  const dispatch = useDispatch();

  const activeCollectionId = useSelector(selectActiveCollectionId);

  const [isEditing, setIsEditing] = useState(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const handleCancelEdit = () => setIsEditing(false);
  const handleStartEdit = () => setIsEditing(true);

  const handleRemoveWord = () => {
    if (activeCollectionId)
      dispatch(removeCardsFromCollectionAsync(activeCollectionId, [id]));
  };

  return isEditing ? (
    <EditCard
      id={id}
      word={{ word, translate, context }}
      handleCancelEdit={handleCancelEdit}
    />
  ) : (
    <Card.Body className="py-2">
      <Row>
        <Card.Title
          as={Col}
          md="auto"
          className="fs-3 mb-0 d-flex align-items-center"
        >
          {word}
        </Card.Title>

        <Card.Text
          as={Col}
          className="mb-0 fs-4 text-muted d-flex align-items-center"
        >
          {translate}
        </Card.Text>

        <Card.Text
          as={Col}
          md="auto"
          className="mb-0 text-muted d-flex align-items-center"
        >
          {new Date(createdAt).toLocaleString()}
        </Card.Text>

        <Col md="auto" className="mb-0 d-flex align-items-center">
          <Button
            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
            aria-controls="example-collapse-text"
            aria-expanded={isCollapseOpen}
            variant="outline-primary"
            className="d-flex justify-content-center align-items-center border-0 outline-0"
          >
            {isCollapseOpen ? <UpOutlined /> : <DownOutlined />}
          </Button>
        </Col>
      </Row>

      <Collapse in={isCollapseOpen}>
        <div>
          <Row className="mt-3"></Row>
          <Row>
            <Col className="d-flex align-items-center">
              <Card.Text className="fs-5">
                {(context || "").split("*").map((t, i) =>
                  i === 1 ? (
                    <span key={i} className="fw-bolder">
                      {t}
                    </span>
                  ) : (
                    <span key={i}>{t}</span>
                  )
                )}
              </Card.Text>
            </Col>

            <Col
              className="d-flex align-items-center"
              style={{ flex: "0 0 40px" }}
            >
              <Button
                variant="outline-info"
                className="d-flex justify-content-center align-items-center"
                onClick={handleStartEdit}
              >
                <EditOutlined style={{ fontSize: 20 }} />
              </Button>
            </Col>

            <Col
              className="d-flex align-items-center"
              style={{ flex: "0 0 40px" }}
            >
              <Button
                variant="outline-danger"
                className="d-flex justify-content-center align-items-center"
                onClick={handleRemoveWord}
              >
                <DeleteOutlined style={{ fontSize: 20 }} />
              </Button>
            </Col>
          </Row>

          <Row className="mt-3 ps-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Col key={i} md="auto" className="px-1 d-flex align-items-end">
                <div
                  className={`border rounded-2 ${
                    i <= countUses ? "bg-success" : ""
                  }`}
                  style={{ width: 30, minHeight: 10 }}
                ></div>
              </Col>
            ))}
            <Col
              md="auto"
              className="fs-6 ms-auto text-muted d-flex align-items-end"
            >
              {studyFrom
                ? `next learn:  ${new Date(studyFrom).toLocaleDateString()}`
                : ""}
            </Col>
          </Row>
        </div>
      </Collapse>
    </Card.Body>
  );
};

export default CardItem;
