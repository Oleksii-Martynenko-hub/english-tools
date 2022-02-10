import React, { useState } from "react";
import { Button, Col, Card, Row, Collapse } from "react-bootstrap";
import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

import { IFullWord } from "@/store/reducers/words";
import { useDispatch, useSelector } from "react-redux";
import { removeWordAsync } from "@/store/actions/words";
import { IFullCollection } from "@/store/reducers/collections";
import CollectionForm from "./CollectionForm";
import styled from "styled-components";
import { theme } from "@/containers/App";
import { collectionsActions } from "@/store/actions/collections";
import { selectActiveCollectionId } from "@/store/selectors/collections";

interface Props {
  deck: IFullCollection;
}

const Collection: React.FC<Props> = ({ deck }) => {
  const { id, createdAt, name, userId } = deck;

  const dispatch = useDispatch();

  const activeCollectionId = useSelector(selectActiveCollectionId);

  const [isEditing, setIsEditing] = useState(false);
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  const handleCancelEdit = () => setIsEditing(false);
  const handleStartEdit = () => setIsEditing(true);

  const handleSetActiveCollectionId = () =>
    dispatch(collectionsActions.setActiveCollectionId(id));

  return (
    <CollectionWrap>
      <Button
        onClick={handleSetActiveCollectionId}
        variant="outline-info text-nowrap fs-5"
        active={activeCollectionId === id}
      >
        {name}
      </Button>
    </CollectionWrap>
  );
};

export default Collection;

const CollectionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;
