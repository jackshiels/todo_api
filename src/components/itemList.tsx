import { FC, useState } from "react";
import React from "react";
import { Item } from "./item";
import { ToDoItem } from "../controllers/todoController";
import { useToDoContext } from "../providers/toDoProvider";
import { ToDoItemModel } from "../models/itemModel";

interface Props {
  maxItems: number;
  setSelectedItem: (itemModel: ToDoItemModel) => void;
  clearSelectedItem: () => void;
}

export const ItemList: FC<Props> = (props: Props) => {
  const { items } = useToDoContext();

  const [completedCount, setCompletedCount] = useState<number>(0);
  const Inc = () => setCompletedCount(completedCount + 1);
  const Decr = () => setCompletedCount(completedCount - 1);

  const setCompletedParent = (completed: boolean) => {
    completed ? Inc() : Decr();
  };

  return (
    <>
      <nav className="ItemList">
        {items.map((c: ToDoItem) => {
          return (
            <Item
              key={c.id}
              id={c.id as number}
              name={c.name as string}
              itemCompleted={c.completed as boolean}
              description={c.description as string}
              timestamp={c.timeStamp as Date}
              setCompletedParent={setCompletedParent}
              setSelectedItem={props.setSelectedItem}
            />
          );
        })}
      </nav>
    </>
  );
};
