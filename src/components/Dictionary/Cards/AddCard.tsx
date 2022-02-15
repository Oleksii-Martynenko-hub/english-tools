import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import {
  addWordAsync,
  getTranslateOfWordAsync,
  wordsActions,
} from "@/store/actions/words";
import {
  selectIsGetTranslatePending,
  selectIsWordsPending,
  selectIsWordsRejected,
  selectTranslate,
  selectWordsErrorMsg,
} from "@/store/selectors/words";
import { IWord } from "@/store/reducers/words";

import { useTimeout } from "@/components/common/hooks/useTimeout";
import useToggle from "@/components/common/hooks/useToggle";
import Loader from "@/components/common/Loader";
import Typing from "@/components/common/Typing";

const initWordValues = { word: "", translate: "", context: "" };

const AddNewCard: React.FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(selectIsWordsPending);
  const translate = useSelector(selectTranslate);
  const isGetTranslatePending = useSelector(selectIsGetTranslatePending);

  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [isFormVisible, setIsFormVisible] = useToggle();
  const [isChoosingWord, setIsChoosingWord] = useToggle();
  const [isTypingWord, setIsTypingWord] = useToggle();
  const [chosenWord, setChosenWord] = useState<number | null>(null);

  const [errValidationMsg, setErrValidationMsg] = useState({
    word: "",
    translate: "",
  });
  const [word, setWord] = useState<IWord>(initWordValues);

  const getTranslate = async () => {
    if (word.word && word.word.length > 1)
      await dispatch(getTranslateOfWordAsync(word.word));
    setIsTypingWord(false);
  };

  const [reset, clear] = useTimeout(getTranslate, 1000);

  const handleInputs = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setErrValidationMsg((prev) => ({ ...prev, [name]: "" }));
    setWord({ ...word, [name]: value });
    if (name === "word") {
      if (translate !== null) dispatch(wordsActions.setTranslate(null));
      setIsTypingWord(true);
      reset();
    }
  };

  const handleClickOnTranslate = () => {
    setWord((prev) => ({ ...prev, translate: translate || "" }));
    dispatch(wordsActions.setTranslate(null));
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

    initState();
  };

  const handleChosenWord = async (index: number) => {
    const context = (word.context || "")
      .split(" ")
      .map((w, i) => (index === i ? "*" + w + "*" : w))
      .join(" ");

    await dispatch(addWordAsync({ ...word, context }));

    initState();
  };

  const initState = () => {
    clear();
    setWord(initWordValues);
    setChosenWord(null);
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
            onClick={() => setIsFormVisible(!isFormVisible)}
            aria-controls="example-collapse-text"
            aria-expanded={isFormVisible}
            variant="outline-primary"
            className="mt-2 d-flex justify-content-center align-items-center"
          >
            {isFormVisible ? <CloseCircleOutlined /> : <PlusCircleOutlined />}
          </Button>
        </Col>
      </Row>

      <Collapse in={isFormVisible}>
        <Form>
          <Row className="mt-2"></Row>
          {!isChoosingWord && (
            <Row className="mb-2">
              <Col>
                <Form.Group controlId="formWord">
                  <Form.Label className="mb-1">
                    Word{" "}
                    <OverlayTrigger
                      key="description_field"
                      placement="right-end"
                      overlay={
                        <Tooltip id="description_word_field">
                          You can choose the proposed translation, start typing
                          for searching translate.
                        </Tooltip>
                      }
                    >
                      <QuestionCircleFilled
                        style={{ verticalAlign: "0.075em" }}
                      />
                    </OverlayTrigger>
                  </Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      ref={firstFieldRef}
                      value={word.word}
                      onChange={handleInputs}
                      name="word"
                      type="text"
                      placeholder="Enter word"
                    />
                    <div className="p-1 position-absolute top-0 end-0 h-100">
                      {translate ? (
                        <Button
                          style={{ padding: "3px 12px" }}
                          onClick={handleClickOnTranslate}
                          variant="outline-primary border-0"
                        >
                          {translate}
                        </Button>
                      ) : (
                        (isGetTranslatePending || isTypingWord) && (
                          <Typing className="h-100 px-2 pt-1" />
                        )
                      )}
                    </div>
                  </div>
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
                        setChosenWord(i);
                        handleChosenWord(i);
                      }}
                      variant="outline-primary border-0"
                    >
                      {chosenWord === i && isPending ? (
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
                        key="description_context_field"
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
    </Card.Body>
  );
};

export default AddNewCard;
