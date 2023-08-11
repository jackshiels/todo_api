import { FC, useState } from "react";
import React from "react";
import { ItemList } from "./itemList";
import { ToDoItemModel } from "../models/itemModel";
import { SelectedItemWindow } from "./selectedItemWindow";

const emptySelection: ToDoItemModel = {
  name: "",
  description: "",
  timestamp: undefined,
};

export const TodoBody: FC = () => {
  const [selectedItem, setSelectedItem] =
    useState<ToDoItemModel>(emptySelection);
  const setThisSelectedItem = (itemModel: ToDoItemModel) => {
    setSelectedItem(itemModel);
  };
  const clearSelectedItem = () => {
    setSelectedItem(emptySelection);
  };
  return (
    <>
      <ItemList
        maxItems={5}
        setSelectedItem={setThisSelectedItem}
        clearSelectedItem={clearSelectedItem}
      />
      <SelectedItemWindow itemModel={selectedItem as ToDoItemModel} />
    </>
  );
};
