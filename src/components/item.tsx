/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";
import { FC, useReducer } from "react";
import { DeleteItemButton } from "./deleteItemButton";
import { useToDoContext } from "../providers/toDoProvider";
import { Action, reducer } from "../stores/itemStore";

interface Props {
  id: number;
  name: string;
  itemCompleted: boolean;
  description: string;
  timestamp: Date;
  selected: boolean;
  setCompletedParent: (completed: boolean) => void;
  setSelectedItem: (itemId: number) => void;
}

interface ThemeProps {
  completed: boolean;
  selected: boolean;
}

export const Item: FC<Props> = (props: Props) => {
  const { DeleteItem, CompleteItem, loadCompleted } = useToDoContext();
  const { id, name } = props;

  const [completedState, dispatcher] = useReducer(reducer, {
    completed: props.itemCompleted,
  });

  const HandleChange = async (action: Action) => {
    dispatcher(action);
    await CompleteItem(id, !completedState.completed);
  };

  console.log(props.itemCompleted);

  return (
    <>
      <Link to={`/items/${props.id}`}>
        <ItemDiv
          completed={props.itemCompleted}
          selected={props.selected}
          onClick={() => {
            props.setSelectedItem(props.id);
          }}
        >
          <ItemCheckbox
            type="checkbox"
            value="Completed"
            checked={completedState.completed}
            disabled={!loadCompleted}
            onChange={() => {
              completedState.completed
                ? HandleChange({ type: "incomplete", complete: false })
                : HandleChange({ type: "complete", complete: true });
            }}
          />
          <ItemLabel>{name}</ItemLabel>
        </ItemDiv>
      </Link>
      <DeleteItemButton id={id} deleteItem={DeleteItem} />
    </>
  );
};

const ItemDiv = styled.div<ThemeProps>`
  width: 195px;
  float: left;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  height: 75px;
  margin-top: 2px;
  margin-bottom: 2px;
  margin-left: 5px;
  color: white;
  background-color: ${(props) => (props.completed ? "seagreen" : "crimson")};
  border: solid 2px ${(props) => (props.selected ? "dimgrey" : "darkgray")};
  font-size: ${(props) => (props.selected ? "16pt" : "12pt")};
  font-weight: 600;
  display: inline-flex;
`;

const ItemCheckbox = styled.input`
  margin-right: 15px;
`;

const ItemLabel = styled.label`
  padding-top: 25px;
`;
