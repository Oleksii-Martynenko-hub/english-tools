import { getCardsForTrainingAsync } from "@/store/actions/training";
import { selectCardsToTraining } from "@/store/selectors/training";
import React, { useEffect, useState } from "react";
import { Button, Card, CloseButton, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LearnStep from "./LearnStep";
import RememberStep from "./RememberStep";

const initStepOfTraining = {
  remember: false,
  learn: false,
  repeat: false,
};

const TrainingCamp: React.FC = () => {
  const dispatch = useDispatch();

  const cardsToTraining = useSelector(selectCardsToTraining);

  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [wordsToTraining, setWordsToTraining] =
    useState<any[]>(cardsToTraining);
  const [stepOfTraining, setStepOfTraining] = useState(initStepOfTraining);

  useEffect(() => {
    dispatch(getCardsForTrainingAsync(undefined, { limit: 5, offset: 0 }));
  }, []);

  const handleTrainingStart = () => {
    setIsTrainingStarted((prev) => !prev);
    setWordsToTraining(cardsToTraining);
    setStepOfTraining({ ...initStepOfTraining, remember: true });
  };

  const handleSetLearnStep = () =>
    setStepOfTraining({ ...initStepOfTraining, learn: true });

  const handleCancelTraining = () => {
    setWordsToTraining([]);
    setStepOfTraining(initStepOfTraining);
    setIsTrainingStarted(false);
  };

  return (
    <Col>
      <h2 className="fs-2">Training Camp</h2>

      <Card
        style={{ overflow: "hidden scroll", height: "calc(100vh - 126px)" }}
        className="p-3 d-flex justify-content-center align-items-center position-relative"
      >
        {isTrainingStarted ? (
          <>
            <CloseButton
              className="position-absolute top-0 end-0 p-3"
              onClick={handleCancelTraining}
              aria-label="Hide"
            />
            {!!stepOfTraining.remember && (
              <RememberStep
                wordsToTraining={wordsToTraining}
                handleSetLearnStep={handleSetLearnStep}
              />
            )}
            {!!stepOfTraining.learn && (
              <LearnStep
                wordsToTraining={wordsToTraining}
                handleCancelTraining={handleCancelTraining}
              />
            )}
          </>
        ) : (
          <Button
            onClick={handleTrainingStart}
            size="lg"
            style={{ width: 140 }}
          >
            Start
          </Button>
        )}
      </Card>
    </Col>
  );
};

export default TrainingCamp;
