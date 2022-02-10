import React, { useState } from "react";
import { Button, Form, Col, Card, Row, Collapse } from "react-bootstrap";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addWordAsync } from "@/store/actions/words";
import {
  selectIsWordsPending,
  selectIsWordsRejected,
  selectWordsErrorMsg,
} from "@/store/selectors/words";
import Loader from "../../common/ProtectedRouter/Loader";

const initWordValues = { word: "", translate: "", context: "" };

const AddNewCard: React.FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(selectIsWordsPending);
  const isRejected = useSelector(selectIsWordsRejected);
  const errorMsg = useSelector(selectWordsErrorMsg);

  const [isAddWordVisible, setIsAddWordVisible] = useState(false);
  const [isChoosingWord, setIsChoosingWord] = useState(false);
  const [word, setWord] = useState(initWordValues);

  const handleInputs = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => setWord({ ...word, [name]: value });

  const handleChosenWord = (index: number) => () => {
    const context = word.context
      .split(" ")
      .map((w, i) => (index === i ? "*" + w + "*" : w))
      .join(" ");

    dispatch(addWordAsync({ ...word, context }));

    setIsChoosingWord(false);
    setIsAddWordVisible(false);
  };

  return (
    <Card.Body className="py-1 pb-2">
      <Row>
        <Card.Title as={Col} className="fs-3 mb-0">
          Add new word
        </Card.Title>
        <Col md="auto">
          <Button
            onClick={() => setIsAddWordVisible(!isAddWordVisible)}
            aria-controls="example-collapse-text"
            aria-expanded={isAddWordVisible}
            variant="outline-primary"
            className="mt-2 d-flex justify-content-center align-items-center"
          >
            {isAddWordVisible ? (
              <CloseCircleOutlined />
            ) : (
              <PlusCircleOutlined />
            )}
          </Button>
        </Col>
      </Row>

      <Collapse in={isAddWordVisible}>
        <Form>
          <Row className="mt-2"></Row>
          <Row className="mb-2">
            <Col>
              <Form.Group controlId="formWord">
                <Form.Label className="mb-1">Word</Form.Label>
                <Form.Control
                  value={word.word}
                  onChange={handleInputs}
                  name="word"
                  type="text"
                  placeholder="Enter word"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTranslate">
                <Form.Label className="mb-1">Translate</Form.Label>
                <Form.Control
                  value={word.translate}
                  onChange={handleInputs}
                  name="translate"
                  type="text"
                  placeholder="Enter translate"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {isChoosingWord ? (
              <>
                {word.context.split(" ").map((w, i) => (
                  <Col md="auto" style={{ padding: 5 }}>
                    <Button
                      style={{ padding: 5 }}
                      onClick={handleChosenWord(i)}
                      variant="outline-primary border-0"
                    >
                      {w}
                    </Button>
                  </Col>
                ))}
              </>
            ) : (
              <>
                <Col>
                  <Form.Group controlId="formContext">
                    <Form.Label className="mb-1">Context</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      value={word.context}
                      onChange={handleInputs}
                      name="context"
                      type="text"
                      placeholder="Enter context"
                    />
                  </Form.Group>
                </Col>

                <Col md="auto" className="align-self-end">
                  {isPending && <Loader />}
                  <Button
                    style={{ flex: "0 0 60px" }}
                    variant="primary"
                    onClick={() => setIsChoosingWord(true)}
                  >
                    Add
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Collapse>
    </Card.Body>
  );
};

export default AddNewCard;
