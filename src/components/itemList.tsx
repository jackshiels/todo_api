/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { FC, useState } from "react";
import { Item } from "./item";
import { ToDoItem } from "../controllers/todoController";
import { useToDoContext } from "../providers/toDoProvider";
import { AddItemWindow } from "./addItemWindow";

interface Props {
  maxItems: number;
  selectedItem: number;
  setSelectedItem: (itemId: number) => void;
  clearSelectedItem: () => void;
}

export const ItemList: FC<Props> = (props: Props) => {
  const { items, loadCompleted } = useToDoContext();

  const [completedCount, setCompletedCount] = useState<number>(0);
  const Inc = () => setCompletedCount(completedCount + 1);
  const Decr = () => setCompletedCount(completedCount - 1);

  const setCompletedParent = (completed: boolean) => {
    completed ? Inc() : Decr();
  };

  return (
    <ItemListCss>
      <AddItemWindow enabled={loadCompleted} />
      {items.map((c: ToDoItem) => {
        return (
          <Item
            key={c.id}
            id={c.id as number}
            selected={props.selectedItem === c.id}
            name={c.name as string}
            itemCompleted={c.completed as boolean}
            description={c.description as string}
            timestamp={c.timeStamp as Date}
            setCompletedParent={setCompletedParent}
            setSelectedItem={props.setSelectedItem}
          />
        );
      })}
    </ItemListCss>
  );
};

const ItemListCss = styled.nav`
  float: left;
  width: 300px;
`;
