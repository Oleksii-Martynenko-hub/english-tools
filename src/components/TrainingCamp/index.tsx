import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CloseButton, Col } from "react-bootstrap";

import {
  getCardsForTrainingAsync,
  getRandomWordAsync,
  trainingActions,
} from "@/store/actions/training";
import { IFullWord } from "@/store/reducers/words";
import {
  selectCardsToTraining,
  selectCurrentCard,
  selectIsGetCardsToTrainingPending,
  selectIsTrainingPending,
  selectIsTrainingRejected,
  selectIsTrainingResolved,
  selectTrainingErrorMsg,
} from "@/store/selectors/training";

import Loader from "@/components/common/ProtectedRouter/Loader";
import LearnStep from "@/components/TrainingCamp/LearnStep";
import RememberStep from "@/components/TrainingCamp/RememberStep";

const initStepOfTraining = {
  remember: false,
  learn: false,
  repeat: false,
};

const TrainingCamp: React.FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(selectIsTrainingPending);
  const isGetCardsToTrainingPending = useSelector(
    selectIsGetCardsToTrainingPending
  );
  const isResolved = useSelector(selectIsTrainingResolved);
  const isRejected = useSelector(selectIsTrainingRejected);
  const errorMsg = useSelector(selectTrainingErrorMsg);

  const cardsToTraining = useSelector(selectCardsToTraining);
  const currentCard = useSelector(selectCurrentCard);

  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [wordsToTraining, setWordsToTraining] =
    useState<IFullWord[]>(cardsToTraining);
  const [stepOfTraining, setStepOfTraining] = useState(initStepOfTraining);

  useEffect(() => {
    setWordsToTraining(cardsToTraining);
  }, [cardsToTraining]);

  const handleTrainingStart = () => {
    dispatch(getCardsForTrainingAsync(undefined, { limit: 5, offset: 0 }));
    setIsTrainingStarted((prev) => !prev);
    setStepOfTraining({ ...initStepOfTraining, remember: true });
  };

  const handleSetLearnStep = () => {
    if (currentCard) dispatch(getRandomWordAsync(currentCard.word));
    setStepOfTraining({ ...initStepOfTraining, learn: true });
  };
  const handleCancelTraining = () => {
    dispatch(trainingActions.setCardsToTraining([]));
    dispatch(trainingActions.setAnswers([]));
    dispatch(trainingActions.setCurrentCard(null));
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
            {isGetCardsToTrainingPending ? (
              <Loader />
            ) : isRejected ? (
              <p>{errorMsg}</p>
            ) : (
              <>
                {isPending ? (
                  <div className="position-absolute top-0 end-0 p-3">
                    <Loader percentSize={60} />
                  </div>
                ) : (
                  <CloseButton
                    className="position-absolute top-0 end-0 p-3"
                    onClick={handleCancelTraining}
                    aria-label="Hide"
                  />
                )}

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
