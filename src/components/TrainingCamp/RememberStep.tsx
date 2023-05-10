import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

interface Props {
  wordsToTraining: any[];
  handleSetLearnStep: VoidFunction;
}

const RememberStep: React.FC<Props> = ({
  wordsToTraining,
  handleSetLearnStep,
}) => {
  const [currentWord, setCurrentWord] = useState(1);

  const handleNextButton = () => {
    if (currentWord === wordsToTraining.length) {
      handleSetLearnStep();
      return;
    }
    setCurrentWord((prev) => prev + 1);
  };

  const handlePrevButton = () => {
    setCurrentWord((prev) => prev - 1);
  };

  return (
    <div className="border rounded-3 overflow-hidden">
      {!!wordsToTraining.length && (
        <>
          {/* <Card.Img
            className="mb-3"
            variant="top"
            width={300}
            height={180}
            src="http://placeimg.com/300/180/animals"
          /> */}
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <Card.Title className="fs-2">
                  {wordsToTraining[currentWord - 1].word}
                </Card.Title>
              </Col>

              <Col md="auto">
                <Card.Title className="fs-2 text-muted">
                  {wordsToTraining[currentWord - 1].translate}
                </Card.Title>
              </Col>
            </Row>

            <Card.Text className="fs-4">
              {(wordsToTraining[currentWord - 1].context || "")
                .split("*")
                .map((t: string, i: number) =>
                  i === 1 ? (
                    <span key={i} className="fw-bolder">
                      {t}
                    </span>
                  ) : (
                    <span key={i}>{t}</span>
                  )
                )}
            </Card.Text>
            <Row>
              <Col>
                {currentWord > 1 && (
                  <Button onClick={handlePrevButton} variant="primary">
                    prev
                  </Button>
                )}
              </Col>
              <Col md="auto">
                <Button onClick={handleNextButton} variant="primary">
                  {currentWord === wordsToTraining.length
                    ? "Ready to learn"
                    : "next"}
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </>
      )}
    </div>
  );
};

export default RememberStep;
