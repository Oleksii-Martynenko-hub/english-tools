import React, { useRef, useState } from "react";
import {
  Button,
  Form,
  Col,
  Card,
  Row,
  Collapse,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  PlusCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addWordAsync } from "@/store/actions/words";
import {
  selectIsWordsPending,
  selectIsWordsRejected,
  selectWordsErrorMsg,
} from "@/store/selectors/words";
import Loader from "../../common/Loader";
import { IWord } from "@/store/reducers/words";

const initWordValues = { word: "", translate: "", context: "" };

const AddNewCard: React.FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(selectIsWordsPending);
  const isRejected = useSelector(selectIsWordsRejected);
  const errorMsg = useSelector(selectWordsErrorMsg);

  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [isAddWordVisible, setIsAddWordVisible] = useState(false);
  const [isChoosingWord, setIsChoosingWord] = useState(false);
  const [choosingWord, setChoosingWord] = useState<number | null>(null);

  const [errValidationMsg, setErrValidationMsg] = useState({
    word: "",
    translate: "",
  });
  const [word, setWord] = useState<IWord>(initWordValues);

  const handleInputs = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setErrValidationMsg((prev) => ({ ...prev, [name]: "" }));
    setWord({ ...word, [name]: value });
  };

  const handleAddCard: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!word.word || !word.translate) {
      const errs = { word: "", translate: "" };

      if (!word.word) errs.word = "Word is required field!";
      if (!word.translate) errs.translate = "Translate is required field!";

      return setErrValidationMsg(errs);
    }

    if (word.context) return setIsChoosingWord(true);

    await dispatch(addWordAsync({ ...word, context: undefined }));

    setWord(initWordValues);
    handleFocusToFirstField();
  };

  const handleChosenWord = async (index: number) => {
    const context = (word.context || "")
      .split(" ")
      .map((w, i) => (index === i ? "*" + w + "*" : w))
      .join(" ");

    await dispatch(addWordAsync({ ...word, context }));

    setWord(initWordValues);
    setChoosingWord(null);
    setIsChoosingWord(false);
    handleFocusToFirstField();
  };

  const handleFocusToFirstField = () => {
    if (firstFieldRef && firstFieldRef.current) firstFieldRef.current.focus();
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
          {!isChoosingWord && (
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="formWord">
                  <Form.Label className="mb-1">Word</Form.Label>
                  <Form.Control
                    ref={firstFieldRef}
                    value={word.word}
                    onChange={handleInputs}
                    name="word"
                    type="text"
                    placeholder="Enter word"
                  />
                </Form.Group>

                {errValidationMsg.word && (
                  <Form.Text className="text-danger">
                    {errValidationMsg.word}
                  </Form.Text>
                )}
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
                {errValidationMsg.translate && (
                  <Form.Text className="text-danger">
                    {errValidationMsg.translate}
                  </Form.Text>
                )}
              </Col>
            </Row>
          )}

          <Row>
            {isChoosingWord ? (
              <>
                <Form.Text className="text-info">
                  Press 'tab' or click for choosing the word.
                </Form.Text>
                {(word.context || "").split(" ").map((w, i) => (
                  <Col key={i} md="auto" style={{ padding: 5 }}>
                    <Button
                      style={{ padding: 5 }}
                      onClick={() => {
                        setChoosingWord(i);
                        handleChosenWord(i);
                      }}
                      variant="outline-primary border-0"
                    >
                      {choosingWord === i && isPending ? (
                        <Loader
                          style={{ width: 26, height: 26, marginRight: 0 }}
                        />
                      ) : (
                        w
                      )}
                    </Button>
                  </Col>
                ))}
              </>
            ) : (
              <>
                <Col>
                  <Form.Group controlId="formContext">
                    <Form.Label className="mb-1">
                      Context (optional){" "}
                      <OverlayTrigger
                        key="description_field"
                        overlay={
                          <Tooltip id="description_field">
                            Write some example for using this word.
                          </Tooltip>
                        }
                      >
                        <QuestionCircleFilled
                          style={{ verticalAlign: "0.075em" }}
                        />
                      </OverlayTrigger>
                    </Form.Label>
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

                <Col
                  md="auto"
                  className="d-flex align-items-center align-self-end"
                >
                  {isPending && (
                    <Loader style={{ width: 30, height: 30, marginRight: 0 }} />
                  )}
                </Col>

                <Col md="auto" className="align-self-end">
                  <Button
                    type="submit"
                    style={{ flex: "0 0 60px" }}
                    variant="primary"
                    onClick={handleAddCard}
                  >
                    Add
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Collapse>
      {/* <ToastContainer className="p-3" position="top-end">
        <Toast
          show={isShowError}
          onClose={toggleShowError}
          bg="danger"
          // delay={5000}
          // autohide
        >
          <Toast.Header>
            <span className="me-auto">Validation errors</span>{" "}
          </Toast.Header>
          <Toast.Body>
            {errValidationMsg.map((msg) => (
              <span className="d-inline-block" key={msg}>
                {msg}
              </span>
            ))}
          </Toast.Body>
        </Toast>
      </ToastContainer> */}
    </Card.Body>
  );
};

export default AddNewCard;
