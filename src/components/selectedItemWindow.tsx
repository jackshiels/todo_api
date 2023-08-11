import { ToDoItemModel } from "../models/itemModel";
import React from "react";

interface Props {
  itemModel: ToDoItemModel;
}

export const SelectedItemWindow = (props: Props) => {
  return (
    <>
      <article className="ItemSelectionName">
        <h2>{props.itemModel.name}</h2>
      </article>
      <article className="ItemSelectionDescription">
        <>
          <h2>{props.itemModel.description}</h2>
          <p>
            {typeof props.itemModel.timestamp !== "undefined"
              ? `Created: ${props.itemModel.timestamp?.toDateString()}`
              : ""}
          </p>
        </>
      </article>
    </>
  );
};
