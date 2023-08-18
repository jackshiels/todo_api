/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useReducer } from "react";
import { DeleteItemButton } from "./deleteItemButton";
import { useToDoContext } from "../providers/toDoProvider";
import { Action, reducer } from "../stores/itemStore";
import { ToDoItemModel } from "../models/itemModel";

interface Props {
  id: number;
  name: string;
  itemCompleted: boolean;
  description: string;
  timestamp: Date;
  setCompletedParent: (completed: boolean) => void;
  setSelectedItem: (todoItem: ToDoItemModel) => void;
}

const itemCheckbox = css`
  margin-right: 15px;
`;

const itemLabel = css`
  padding-top: 25px;
`;

export const Item: FC<Props> = (props: Props) => {
  const { DeleteItem, CompleteItem, loadCompleted } = useToDoContext();
  const { id, name, description, timestamp } = props;

  const [completedState, dispatcher] = useReducer(reducer, {
    completed: props.itemCompleted,
  });

  const HandleChange = async (action: Action) => {
    dispatcher(action);
    await CompleteItem(id, !completedState.completed);
  };

  const itemCss = css`
    width: 200px;
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
    background-color: ${completedState.completed ? "seagreen" : "crimson"};
    border: 2px white;
    font-size: 14pt;
    font-weight: 600;
    display: inline-flex;
  `;

  return (
    <>
      <div
        onClick={() =>
          props.setSelectedItem({
            name: name,
            description: description,
            timestamp: timestamp,
          } as ToDoItemModel)
        }
        css={itemCss}
      >
        <input
          css={itemCheckbox}
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
        <label css={itemLabel}>{name}</label>
      </div>
      <DeleteItemButton id={id} deleteItem={DeleteItem} />
    </>
  );
};
