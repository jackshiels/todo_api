import React from "react";
import { FC, useReducer, useState } from "react";
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

const deleteIcon = require("../images/icons8-delete-24.png");

export const Item: FC<Props> = (props: Props) => {
  const { DeleteItem, CompleteItem, loadCompleted } = useToDoContext();
  const { id, name, description, timestamp } = props;

  const [completed, setCompleted] = useState<boolean>(props.itemCompleted);
  const [completedState, dispatcher] = useReducer(reducer, {
    completed: props.itemCompleted,
  });

  const HandleChange = async (action: Action) => {
    setCompleted(!completed);
    await CompleteItem(id, !completed);
    dispatcher(action);
  };

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
        className={completedState.completed ? "ItemComplete" : "Item"}
      >
        <input
          className="ItemCheckbox"
          type="checkbox"
          value="Completed"
          checked={completed}
          disabled={!loadCompleted}
          onChange={() => {
            completed
              ? HandleChange({ type: "incomplete", complete: false })
              : HandleChange({ type: "complete", complete: true });
          }}
        />
        <label className="ItemLabel">{name}</label>
      </div>
      <div
        onClick={async () => {
          await DeleteItem(id);
        }}
        className="DeleteItem"
      >
        <img
          className="DeleteIcon"
          width={24}
          height={24}
          src={deleteIcon}
          alt="deleteIcon"
        />
      </div>
    </>
  );
};
