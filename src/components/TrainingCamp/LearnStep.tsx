import { updateLearnedCardsAsync } from "@/store/actions/training";
import { IFullWord } from "@/store/reducers/words";
import { selectAnswers } from "@/store/selectors/training";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import store, { getRandomEls } from "../../utils/store";

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
  console.log("🚀 ~ answers", answers);

  const [currentWord, setCurrentWord] = useState<IFullWord | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [words, setWords] = useState(wordsToTraining);
  const [wordsToRepeat, setWordsToRepeat] = useState<IFullWord[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([]);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (isFirstLoad) getCurrentWordAnswers();
    setIsFirstLoad(false);
  }, []);

  useEffect(() => {
    if (chosenAnswer) {
      setTimeout(() => {
        getCurrentWordAnswers();
        setChosenAnswer(null);
      }, 1000);
    }
  }, [chosenAnswer]);

  useEffect(() => {
    console.log("currentAnswers", currentAnswers);
  }, [currentAnswers]);

  const getCurrentWordAnswers = () => {
    if (words.length === 0) {
      if (wordsToRepeat.length === 0) {
        setCurrentWord(null);
        handleCancelTraining();
        return;
      }
      setWords(wordsToRepeat);
      setWordsToRepeat([]);
      setChosenAnswer(null);
      return;
    }

    const [cWord]: IFullWord[] = getRandomEls(
      isFirstLoad ? words.slice(0, 4) : words,
      1
    );
    console.log("🚀 ~ getCurrentWordAnswers ~ cWord", cWord);

    setCurrentWord(cWord);

    setCurrentAnswers(
      [
        cWord.word,
        ...getRandomEls(
          answers.filter((a) => a !== cWord.word),
          2
        ),
      ].sort(() => Math.random() - Math.random())
    );
  };

  const handleChosenAnswer = (answer: string) => () => {
    if (currentWord) {
      setWords(words.filter((w) => w.id !== currentWord.id));

      if (answer !== currentWord.word)
        setWordsToRepeat((prev) => [...prev, currentWord]);

      if (answer === currentWord.word)
        dispatch(updateLearnedCardsAsync([currentWord.id]));

      setChosenAnswer(answer);
    }
  };

  return (
    <div className="border rounded-3 overflow-hidden">
      {!!currentWord && (
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
                  {currentWord.translate}
                </Card.Title>
              </Col>
            </Row>

            <Row>
              {currentAnswers.map((answer) => (
                <Col
                  key={answer}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Button
                    onClick={handleChosenAnswer(answer)}
                    variant={
                      chosenAnswer === answer
                        ? chosenAnswer === currentWord.word
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
    </div>
  );
};

export default LearnStep;
