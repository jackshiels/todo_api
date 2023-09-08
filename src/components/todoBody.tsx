import { FC, useState } from "react";
import React from "react";
import { ItemList } from "./itemList";
import { SelectedItemWindow } from "./selectedItemWindow";
import { useParams } from "react-router-dom";

export const TodoBody: FC = () => {
  const { itemId } = useParams();
  const [selectedItemId, setSelectedItem] = useState<number>(
    parseInt(itemId as string)
  );
  const setThisSelectedItem = (itemId: number) => {
    setSelectedItem(itemId);
  };
  const clearSelectedItem = () => {
    setSelectedItem(0);
  };
  return (
    <>
      <ItemList
        maxItems={5}
        selectedItem={selectedItemId}
        setSelectedItem={setThisSelectedItem}
        clearSelectedItem={clearSelectedItem}
      />
      <SelectedItemWindow itemId={selectedItemId} />
    </>
  );
};
