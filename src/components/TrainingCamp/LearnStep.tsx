import {
  getRandomWordAsync,
  trainingActions,
  updateLearnedCardsAsync,
} from "@/store/actions/training";
import { IFullWord } from "@/store/reducers/words";
import {
  selectAnswers,
  selectCurrentCard,
  selectIsGetAnswersPending,
} from "@/store/selectors/training";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import store, { getRandomEls } from "../../utils/store";
import Loader from "../common/ProtectedRouter/Loader";

interface Props {
  wordsToTraining: IFullWord[];
  handleCancelTraining: VoidFunction;
}

const LearnStep: React.FC<Props> = ({
  wordsToTraining,
  handleCancelTraining,
}) => {
  const dispatch = useDispatch();

  const answers = useSelector(selectAnswers);
  const currentCard = useSelector(selectCurrentCard);
  const isGetAnswersPending = useSelector(selectIsGetAnswersPending);

  const [words, setWords] = useState(wordsToTraining);
  const [wordsToRepeat, setWordsToRepeat] = useState<IFullWord[]>([]);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (chosenAnswer) {
      setTimeout(() => {
        getCurrentWordAnswers();
        setChosenAnswer(null);
      }, 1000);
    }
  }, [chosenAnswer]);

  const getCurrentWordAnswers = () => {
    if (words.length === 0) {
      if (wordsToRepeat.length === 0) {
        handleCancelTraining();
        return;
      }
      setWords(wordsToRepeat);
      setWordsToRepeat([]);
      setChosenAnswer("0");
      return;
    }

    const [cWord]: IFullWord[] = getRandomEls(words, 1);

    dispatch(trainingActions.setCurrentCard(cWord));
    dispatch(getRandomWordAsync(cWord.word));
  };

  const handleChosenAnswer = (answer: string) => () => {
    if (currentCard) {
      setWords(words.filter((w) => w.id !== currentCard.id));

      if (answer !== currentCard.word)
        setWordsToRepeat((prev) => [...prev, currentCard]);

      if (answer === currentCard.word)
        dispatch(updateLearnedCardsAsync([currentCard.id]));

      setChosenAnswer(answer);
    }
  };

  return (
    <div className="border rounded-3 overflow-hidden">
      {isGetAnswersPending ? (
        <Loader />
      ) : (
        <>
          {!!currentCard && (
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
                      {currentCard.translate}
                    </Card.Title>
                  </Col>
                </Row>

                <Row>
                  {answers.map((answer) => (
                    <Col
                      key={answer}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Button
                        onClick={handleChosenAnswer(answer)}
                        variant={
                          chosenAnswer === answer
                            ? chosenAnswer === currentCard.word
                              ? "success"
                              : "danger"
                            : "primary"
                        }
                      >
                        {answer}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LearnStep;
