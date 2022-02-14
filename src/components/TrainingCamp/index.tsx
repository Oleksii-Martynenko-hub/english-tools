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
  const isRejected = useSelector(selectIsTrainingRejected);
  const errorMsg = useSelector(selectTrainingErrorMsg);
  const isGetCardsToTrainingPending = useSelector(
    selectIsGetCardsToTrainingPending
  );
  const cardsToTraining = useSelector(selectCardsToTraining);
  const currentCard = useSelector(selectCurrentCard);

  const [isTrainingStarted, setIsTrainingStarted] = useState(false);
  const [isErrorRangeCards, setIsErrorRangeCards] = useState(false);
  const [wordsToTraining, setWordsToTraining] =
    useState<IFullWord[]>(cardsToTraining);
  const [stepOfTraining, setStepOfTraining] = useState(initStepOfTraining);

  useEffect(() => {
    if (cardsToTraining.length) handleTrainingStart();
  }, [cardsToTraining]);

  const handleOnClickBtnStart = () => {
    dispatch(getCardsForTrainingAsync(undefined, { limit: 5, offset: 0 }));
  };

  const handleTrainingStart = () => {
    if (cardsToTraining.length < 5) {
      setIsErrorRangeCards(true);
      setTimeout(() => setIsErrorRangeCards(false), 5000);
      return;
    }

    setWordsToTraining(cardsToTraining);
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
        {isGetCardsToTrainingPending ? (
          <Loader />
        ) : isTrainingStarted ? (
          <>
            {isRejected ? (
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
            onClick={handleOnClickBtnStart}
            size="lg"
            style={{ width: 140 }}
          >
            Start
          </Button>
        )}
        {isErrorRangeCards && (
          <p className="text-danger mt-2" style={{ marginBottom: "-56px" }}>
            Not enough cards for training,
            <br /> add one more or try later!
          </p>
        )}
      </Card>
    </Col>
  );
};

export default TrainingCamp;
