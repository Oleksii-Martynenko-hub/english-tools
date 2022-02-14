import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import styled from "styled-components";

import {
  addCardsToCollectionAsync,
  collectionsActions,
  getCollectionsListAsync,
  getCollectionWithCardsAsync,
  removeCollectionAsync,
} from "@/store/actions/collections";
import {
  selectActiveCollectionId,
  selectCollectionsList,
  selectCollectionWithCards,
  selectIsCollectionsPending,
} from "@/store/selectors/collections";
import { IFullWord } from "@/store/reducers/words";
import { selectWordsList } from "@/store/selectors/words";

import CollectionForm from "@/components/Dictionary/Decks/CollectionForm";
import Collection from "@/components/Dictionary/Decks/Collection";
import CardsOfDeck from "@/components/Dictionary/Decks/CardsOfDeck";
import Loader from "@/components/common/Loader";
import { initDataCommonWords } from "@/utils/data";

const Decks: React.FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(selectIsCollectionsPending);

  const collections = useSelector(selectCollectionsList);
  const commonCards = useSelector(selectWordsList);

  const activeCollectionId = useSelector(selectActiveCollectionId);

  const collection = useSelector(selectCollectionWithCards(activeCollectionId));

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [commonCardsWithoutExist, setCommonCardsWithoutExist] = useState<
    IFullWord[]
  >([]);
  const [cards, setCards] = useState<IFullWord[]>([]);

  useEffect(() => {
    if (collection && collection.cards) {
      setCards(collection.cards);
      setCommonCardsWithoutExist(
        commonCards.reduce((res, item) => {
          const cardExistInCollection = collection.cards?.find(
            (i) => i.id === item.id
          );
          return cardExistInCollection ? res : [...res, item];
        }, [] as IFullWord[])
      );
      return;
    }

    if (activeCollectionId)
      dispatch(getCollectionWithCardsAsync(activeCollectionId));
  }, [activeCollectionId, collection]);

  useEffect(() => {
    dispatch(getCollectionsListAsync());

    // initDataCommonWords.forEach(({ word, translate, context }) => {
    //   dispatch(addWordAsync({ translate, word, context }));
    // });
  }, []);

  useEffect(() => {
    if (!activeCollectionId && collections && collections.length)
      dispatch(collectionsActions.setActiveCollectionId(collections[0].id));
  }, [collections]);

  const handleRemoveCollection = () =>
    activeCollectionId && dispatch(removeCollectionAsync(activeCollectionId));

  const handleAddCardToCollection = (id: number) => () =>
    activeCollectionId &&
    dispatch(addCardsToCollectionAsync(activeCollectionId, [id]));

  return (
    <DecksStyled className="border">
      <DecksList className="m-0">
        <DeckItemWrap key="new">
          <CollectionForm
            isFormVisible={isAdding}
            setIsAdding={setIsAdding}
            handleCancelEdit={() => setIsAdding(false)}
          />
        </DeckItemWrap>

        {collections.map((deck) => (
          <DeckItemWrap key={deck.id}>
            <Collection deck={deck} />
          </DeckItemWrap>
        ))}
      </DecksList>

      <DeckControl>
        {!!commonCardsWithoutExist.length && (
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              + Add card to deck
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {commonCardsWithoutExist.map(({ id, word }) => (
                <Dropdown.Item key={id} onClick={handleAddCardToCollection(id)}>
                  {word}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}

        <Button
          className="me-2"
          variant="danger"
          onClick={handleRemoveCollection}
        >
          Delete deck
        </Button>

        {isEditing ? (
          <CollectionForm
            deck={collections.find((c) => c.id === activeCollectionId)}
            isFormVisible={isEditing}
            handleCancelEdit={() => setIsEditing(false)}
          />
        ) : (
          <Button className="me-auto" onClick={() => setIsEditing(true)}>
            Edit name
          </Button>
        )}

        {isPending && (
          <Loader style={{ width: 32, height: 38, marginRight: 0 }} />
        )}
      </DeckControl>

      <CardsOfDeck cards={cards} />
    </DecksStyled>
  );
};

export default Decks;

const DecksStyled = styled.div`
  overflow: hidden;
  height: calc(100% - 160px);
  background-color: white;
  border-radius: 4px;
  border-top: none !important;
`;

const DeckControl = styled.div`
  padding: 16px;
  border-bottom: 1px solid black;
  display: flex;
`;

const DecksList = styled.ul`
  display: flex;
  align-items: center;
  flex-flow: nowrap;
  overflow: scroll hidden;
  padding: 7px;
`;

const DeckItemWrap = styled.li`
  display: flex;
  align-items: center;
  padding: 7px;
`;
