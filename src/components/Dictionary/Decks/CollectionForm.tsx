import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import {
  selectCollectionsErrorMsg,
  selectIsCollectionsPending,
  selectIsCollectionsRejected,
} from "@/store/selectors/collections";
import {
  addCollectionAsync,
  editCollectionAsync,
} from "@/store/actions/collections";
import { IFullCollection } from "@/store/reducers/collections";

interface Props {
  isFormVisible: boolean;
  deck?: IFullCollection;
  handleCancelEdit: VoidFunction;
  setIsAdding?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CollectionForm: React.FC<Props> = ({
  deck,
  handleCancelEdit,
  setIsAdding,
  isFormVisible,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(deck?.name || "");

  useEffect(() => {
    if (deck) setName(deck.name);
    else setName("");
  }, [deck]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmitCollection: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (deck) dispatch(editCollectionAsync(deck.id, { name }));

    if (!deck) dispatch(addCollectionAsync({ name }));

    setName("");

    handleCancelEdit();
  };

  return (
    <div className="d-flex h-100">
      <Button
        onClick={
          setIsAdding ? () => setIsAdding(!isFormVisible) : handleCancelEdit
        }
        variant="success"
        size="lg"
        className={`me-3 d-flex justify-content-center align-items-center${
          !!deck && "ms-2"
        }`}
      >
        {isFormVisible ? (
          <CloseOutlined className="fs-6" />
        ) : (
          <PlusOutlined className="fs-6" />
        )}
      </Button>

      {isFormVisible && (
        <Form className="d-flex" style={{ minWidth: 250 }}>
          <Form.Group controlId="formWord" className="me-2">
            <Form.Control
              className="h-100"
              value={name}
              onChange={handleInput}
              name="name"
              type="text"
              placeholder="Enter collection name"
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            onClick={handleSubmitCollection}
          >
            {deck ? "Save" : "Add"}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CollectionForm;
