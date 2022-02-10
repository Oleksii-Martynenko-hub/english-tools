import { editWordAsync } from "@/store/actions/words";
import { IWord } from "@/store/reducers/words";
import React, { useState } from "react";
import { Button, Form, Col, Card, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const initWordValues = { word: "", translate: "", context: "" };

interface Props {
  id: number;
  word: IWord;
  handleCancelEdit: VoidFunction;
}

const EditCard: React.FC<Props> = ({ id, word, handleCancelEdit }) => {
  const dispatch = useDispatch();

  const [changedWord, setChangedWord] = useState({
    ...word,
  });

  const handleInputs = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => setChangedWord({ ...changedWord, [name]: value });

  const handleEditWord = () => {
    dispatch(editWordAsync(id, changedWord));

    handleCancelEdit();
  };

  return (
    <Card.Body className="">
      <Row>
        <Card.Title as={Col} className="fs-3 mb-0">
          Edit word
        </Card.Title>
        <Col md="auto">
          <Button
            onClick={handleCancelEdit}
            variant="outline-warning"
            className="mt-2 d-flex justify-content-center align-items-center"
          >
            Cancel
          </Button>
        </Col>
      </Row>

      <Form>
        <Row className="mt-2"></Row>
        <Row className="mb-2">
          <Col>
            <Form.Group controlId="formWord">
              <Form.Label className="mb-1">Word</Form.Label>
              <Form.Control
                value={changedWord.word}
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
                value={changedWord.translate}
                onChange={handleInputs}
                name="translate"
                type="text"
                placeholder="Enter translate"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="formContext">
              <Form.Label className="mb-1">Context</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={changedWord.context}
                onChange={handleInputs}
                name="context"
                type="text"
                placeholder="Enter context"
              />
            </Form.Group>
          </Col>
          <Col md="auto" className="align-self-end">
            <Button
              style={{ flex: "0 0 60px" }}
              variant="success"
              onClick={handleEditWord}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Card.Body>
  );
};

export default EditCard;
